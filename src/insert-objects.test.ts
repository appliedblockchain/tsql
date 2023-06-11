import Sql from './test/sql.js'
import type * as Tsql from './index.js'

let sql: Sql

beforeAll(async () => {
  sql = await Sql.random()
}, 30 * 1000)

afterAll(async () => {
  sql?.close()
})

test('perpare users table', async () => {
  await sql.rows`
    create table Users (
      id int not null identity(1, 1) primary key,
      [name] nvarchar(450),
    )
  `
})

test.each([
  0,
  1,
  100,
  1000,
  1001,
  2000
])('insert %i records', async (length) => {
  const users = Array.from({ length }, (_, i) => ({ name: `user-${i}` }))
  await sql.insertObjects('Users', users)
  await expect(sql.count('Users')).resolves.toBe(length)
  await sql.delete('Users')
})
