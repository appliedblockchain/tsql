import { Connection, Request } from 'tedious'
import tsql from '../'
import type S from '../sanitised'
import type Sid from '../sanitised-identifier'
import type { Where } from '../where'
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
      server: 'localhost',
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
    await sql.rows`create database ${tsql.id(database)}`
    sql.close()
  }

  static async dropDatabase(database: string): Promise<void> {
    const sql = await new Sql({ database: 'master' }).connect()
    await sql.rows`drop database ${tsql.id(database)}`
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

  async query<T>(sql: S): Promise<T[]> {
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
    return this.query<T>(tsql(tsa, ...rest))
  }

  async row<T>(tsa: TemplateStringsArray, ...rest: unknown[]): Promise<T> {
    return this.rows<T>(tsa, ...rest).then(_ => _[0])
  }

  async value<T>(tsa: TemplateStringsArray, ...rest: unknown[]): Promise<T> {
    const row = await this.row<Record<string, T>>(tsa, ...rest)
    return row[Object.keys(row)[0]]
  }

  async count(table: Sid | string, where: Where): Promise<number> {
    return this.value`select count(*) from ${tsql.id(table)} where ${tsql.where(where)}`
  }

  async delete(table: Sid | string, where: Where): Promise<void> {
    await this.query(tsql.delete(table, where))
  }

  async insertObject(table: Sid | string, object: Record<string, unknown>): Promise<boolean[]> {
    return this.query(tsql.insertObject(table, object))
  }

  async modifyJsons(
    table: Sid | string,
    entries: readonly Record<string, unknown>[]
  ): Promise<unknown[]> {
    return this.query(tsql.modifyJsons(table, entries))
  }

}
