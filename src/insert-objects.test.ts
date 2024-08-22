import { beforeAll, afterAll, afterEach, test, expect } from '@jest/globals'
import Client from './test/client.js'

let sql: Client

beforeAll(async () => {
  sql = await Client.random()
}, 30 * 1000)

afterAll(async () => {
  sql?.close()
})

afterEach(async () => {
  await sql.delete('Users')
})

test('create tables', async () => {
  await sql.rows`
    create table Users (
      id int not null identity(1, 1) primary key,
      [name] nvarchar(450),
    );

    create table Roles (
      id nvarchar(32) not null primary key,
      [name] nvarchar(32)
    );
  `
})

test('insert', async () => {
  await sql.insertObjects('Roles', [
    { id: 1, name: 'A' },
    { id: 2, name: 'B' },
    { id: 3, name: 'C' }
  ])
  await expect(sql.row`select count(*) as count from Roles`).resolves.toEqual({ count: 3 })
})

test.each([
  0,
  1,
  100,
  1000,
  1001,
  2000
])('insert %i records', async length => {
  const users = Array.from({ length }, (_, i) => ({ name: `user-${i}` }))
  await sql.insertObjects('Users', users)
  await expect(sql.count('Users')).resolves.toBe(length)
})
