import { Connection, Request } from 'tedious'
import tsql, * as Tsql from '../'
import debugOf from 'debug'
import randomIdentifier from '../random-identifier'

const debug = debugOf('sql')

export default class Sql {

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

  static async createDatabase(database: string): Promise<void> {
    const sql = await new Sql({ database: 'master' }).connect()
    await sql.rows`create database ${Tsql.id(database)}`
    sql.close()
  }

  static async dropDatabase(database: string): Promise<void> {
    const sql = await new Sql({ database: 'master' }).connect()
    await sql.rows`drop database ${Tsql.id(database)}`
    sql.close()
  }

  static async random(): Promise<Sql> {
    const database = randomIdentifier('test_', 16).toString()
    await this.createDatabase(database)
    return new Sql({ database }).connect()
  }

  async connect(): Promise<this> {
    return new Promise((resolve, reject) => {
      this.connection.connect(err => {
        err ? reject(err) : resolve(this)
      })
    })
  }

  close(): void {
    this.connection.close()
  }

  async query<T>(sql: Tsql.S): Promise<T[]> {
    return new Promise((resolve, reject) => {
      const sqlString = sql.toString()
      debug('query', sqlString)
      const request = new Request(sqlString, (err, _rowCount, rows) => {
        if (err) {
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

  async rows<T>(tsa: TemplateStringsArray, ...rest: unknown[]): Promise<T[]> {
    return this.query<T>(Tsql.template(tsa, ...rest))
  }

  async row<T>(tsa: TemplateStringsArray, ...rest: unknown[]): Promise<T> {
    return this.rows<T>(tsa, ...rest).then(_ => _[0])
  }

  async value<T>(tsa: TemplateStringsArray, ...rest: unknown[]): Promise<T> {
    const row = await this.row<Record<string, T>>(tsa, ...rest)
    return row[Object.keys(row)[0]]
  }

  async count(table: Tsql.Sid | string, where: Tsql.Where): Promise<number> {
    return this.value`select count(*) from ${Tsql.id(table)} where ${Tsql.where(where)}`
  }

  async delete(table: Tsql.Sid | string, where: Tsql.Where = tsql.logicalTrue): Promise<void> {
    await this.query(Tsql.delete(table, where))
  }

  async dropTable(table: Tsql.Sid | string): Promise<void> {
    await this.query(Tsql.template`drop table ${Tsql.id(table)};`)
  }

  async insertIgnore(...args: Parameters<typeof Tsql['insertIgnore']>): Promise<unknown> {
    return this.query(Tsql.insertIgnore(...args))
  }

  async insertObject(table: Tsql.Sid | string, object: Record<string, unknown>): Promise<unknown> {
    return this.query(Tsql.insertObject(table, object))
  }

  async insertObjects(table: Tsql.Sid | string, objects: Record<string, unknown>[], maybeKeys?: string[]) {
    return this.query(Tsql.insertObjects(table, objects, maybeKeys))
  }

  async update(table: Tsql.Sid | string, where: Tsql.Where, object: Record<string, unknown>): Promise<unknown> {
    return this.query(Tsql.updateObject(table, where, object))
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
  ): Promise<unknown[]> {
    return this.query(Tsql.modifyJsons(table, entries))
  }

}
