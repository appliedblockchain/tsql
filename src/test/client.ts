import { Connection, Request } from 'tedious'
import * as Tsql from '../index.js'
import randomIdentifier from '../random-identifier.js'

export default class Client {

  connection: Connection

  constructor({
    database = 'test',
    userName = 'sa',
    password = 'yourStrong(!)Password'
  }: {
    database?: string,
    userName?: string,
    password?: string
  } = {}) {
    this.connection = new Connection({
      server: process.env.MSSQL_HOST ?? 'localhost',
      options: {
        database,
        trustServerCertificate: true,
        rowCollectionOnDone: true,
        rowCollectionOnRequestCompletion: true,
        useColumnNames: true
      },
      authentication: { type: 'default', options: { userName, password } }
    })
  }

  static async createDatabase(database: string) {
    const sql = await new Client({ database: 'master' }).connect()
    await sql.rows`create database ${Tsql.id(database)}`
    sql.close()
  }

  static async dropDatabase(database: string) {
    const sql = await new Client({ database: 'master' }).connect()
    await sql.rows`drop database ${Tsql.id(database)}`
    sql.close()
  }

  static async random() {
    const database = randomIdentifier('test_', 16).toString()
    await this.createDatabase(database)
    return new Client({ database }).connect()
  }

  async connect(): Promise<this> {
    return new Promise((resolve, reject) => {
      this.connection.connect((err: unknown) => {
        err != null ? reject(err) : resolve(this)
      })
    })
  }

  close() {
    this.connection.close()
  }

  async query<T>(sql: undefined | Tsql.S): Promise<undefined | (T[])> {
    return new Promise((resolve, reject) => {
      if (typeof sql === 'undefined') {
        resolve(undefined)
        return
      }
      const sqlString = sql.toString()
      const request = new Request(sqlString, (err, _rowCount, rows) => {
        if (err != null) {
          reject(new Error(err.message + `; ${sqlString}`))
        }
        for (const row of rows) {
          for (const key in row) {
            row[key] = row[key].value
          }
        }
        resolve(rows)
      })
      this.connection.execSql(request)
    })
  }

  async rows<T>(tsa: TemplateStringsArray, ...rest: unknown[]) {
    return this.query<T>(Tsql.template(tsa, ...rest))
  }

  async row<T>(tsa: TemplateStringsArray, ...rest: unknown[]) {
    return this.rows<T>(tsa, ...rest).then(_ => _?.[0])
  }

  async value<T>(tsa: TemplateStringsArray, ...rest: unknown[]) {
    const row = await this.row<Record<string, T>>(tsa, ...rest)
    return row?.[Object.keys(row)[0]]
  }

  async count(table: Tsql.Sid | string, where: Tsql.Where = Tsql.logicalTrue) {
    return this.value`select count(*) from ${Tsql.id(table)} where ${Tsql.where(where)}`
  }

  async delete(table: Tsql.Sid | string, where: Tsql.Where = Tsql.logicalTrue) {
    await this.query(Tsql.delete(table, where))
  }

  async dropTable(table: Tsql.Sid | string) {
    await this.query(Tsql.template`drop table ${Tsql.id(table)};`)
  }

  async insertIgnore(...args: Parameters<typeof Tsql['insertIgnore']>) {
    return this.query(Tsql.insertIgnore(...args))
  }

  async insertObject(table: Tsql.Sid | string, object: Record<string, unknown>, output?: Tsql.S) {
    return this.query(Tsql.insertObject(table, object, output))
  }

  async insertObjects(table: Tsql.Sid | string, objects: Record<string, unknown>[], maybeKeys?: string[]) {
    return this.query(Tsql.insertObjects(table, objects, maybeKeys))
  }

  async update(table: Tsql.Sid | string, where: Tsql.Where, object: Record<string, unknown>) {
    return this.query(Tsql.update(table, where, object))
  }

  async merge1n(
    table: Tsql.Sid | string,
    [ lcolumn, rcolumn ]: [ Tsql.Sid | string, Tsql.Sid | string ],
    lid: unknown,
    values: unknown[],
    { hints = [ 'serializable' ] }: {
      hints?: Tsql.TableHintLimited.t[]
    } = {}
  ) {
    return this.query(Tsql.merge1n(table, [ lcolumn, rcolumn ], lid, values, { hints }))
  }

  async modifyJsons(
    table: Tsql.Sid | string,
    entries: readonly Record<string, unknown>[]
  ) {
    return this.query(Tsql.modifyJsons(table, entries))
  }

}
