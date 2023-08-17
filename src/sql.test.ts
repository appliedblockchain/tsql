import * as Tsql from './index.js'
import Sql from './test/sql.js'

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
      metaJson nvarchar(max) not null default '{}'
    )
  `
  await sql.insertObject('Users', { name: 'admin', metaJson: JSON.stringify({ admin: true, stars: 5 }) })
  await sql.insertObject('Users', { name: 'user', metaJson: JSON.stringify({ admin: false, stars: 3 }) })
  await sql.insertObject('Users', { name: 'other1', metaJson: JSON.stringify({ stars: null }) })
  await sql.insertObject('Users', { name: 'other2', metaJson: JSON.stringify({ stars: 1 }) })
  await sql.insertObject('Users', { name: 'other3', metaJson: JSON.stringify({ stars: 2 }) })
  await sql.insertObject('Users', { name: 'other4', metaJson: JSON.stringify({ stars: 3 }) })
  await sql.insertObject('Users', { name: 'other5', metaJson: JSON.stringify({ stars: 4 }) })
})

test('json query', async () => {
  await expect(sql.count('Users', { 'metaJson->$.admin': true })).resolves.toBe(1)
  await expect(sql.count('Users', { 'metaJson->$.admin': null })).resolves.toBe(5)
  await expect(sql.count('Users', { 'metaJson->$.admin': null, 'metaJson->$.stars': { $lte: 3 } })).resolves.toBe(3)
})

test('modify json', async () => {
  await sql.modifyJsons('Users', [
    { name: 'other3', metaJson: { admin: false, updatedAt: 'yes', tags: [ 'foo', 'bar' ] } },
    { name: 'other1', metaJson: { admin: false, updatedAt: 'YES', tags: [ 'foo', 'bar', 'baz' ] } }
  ])
  await expect(sql.rows`select * from Users order by id`).resolves.toEqual([
    { id: 1, name: 'admin', metaJson: '{"admin":true,"stars":5}' },
    { id: 2, name: 'user', metaJson: '{"admin":false,"stars":3}' },
    {
      id: 3,
      name: 'other1',
      metaJson: '{"stars":null,"tags":["foo","bar","baz"]}'
    },
    { id: 4, name: 'other2', metaJson: '{"stars":1}' },
    {
      id: 5,
      name: 'other3',
      metaJson: '{"stars":2,"tags":["foo","bar"]}'
    },
    { id: 6, name: 'other4', metaJson: '{"stars":3}' },
    { id: 7, name: 'other5', metaJson: '{"stars":4}' }
  ])
})

describe('insertIgnore', () => {

  beforeAll(async () => {
    await sql.rows`
      create table Roles (
        id nvarchar(32) not null primary key,
        [name] nvarchar(32)
      )
    `
  })

  afterAll(async () => {
    await sql.dropTable('Roles')
  })

  beforeEach(async () => {
    await sql.delete('Roles')
  })

  test.each([
    [ undefined ],
    [ [] ],
    [ [ 'readcommitted' ] ],
    [ [ 'repeatableread' ] ],
    [ [ 'serializable' ] ]
  ] as [undefined | Tsql.TableHintLimited.t[]][])('insert ignore %p', async hints => {
    await sql.insertIgnore('Roles', [ 'id' ], [
      { id: '1', name: 'A' },
      { id: '2', name: 'B' },
      { id: '3', name: 'C' }
    ], undefined, { hints })
    await sql.insertIgnore('Roles', [ 'id' ], [
      { id: '2', name: 'X' },
      { id: '3', name: 'X' },
      { id: '4', name: 'D' }
    ], undefined, { hints })
    await expect(sql.rows`select * from Roles order by id`).resolves.toEqual([
      { id: '1', name: 'A' },
      { id: '2', name: 'B' },
      { id: '3', name: 'C' },
      { id: '4', name: 'D' }
    ])
  })

})

describe('merge1n', () => {

  beforeAll(async () => {
    await sql.rows`
      create table RolePermissions (
        role nvarchar(32),
        permission nvarchar(32)
      )
    `
  })

  afterAll(async () => {
    await sql.dropTable('RolePermissions')
  })

  test('initital', async () => {
    await sql.merge1n('RolePermissions', [ 'role', 'permission' ], 'ADMIN', [ 'A', 'B', 'C' ])
    await sql.merge1n('RolePermissions', [ 'role', 'permission' ], 'USER', [ 'C', 'D' ])
    await expect(sql.rows`select * from RolePermissions order by role, permission`).resolves.toEqual([
      { role: 'ADMIN', permission: 'A' },
      { role: 'ADMIN', permission: 'B' },
      { role: 'ADMIN', permission: 'C' },
      { role: 'USER', permission: 'C' },
      { role: 'USER', permission: 'D' }
    ])
    await sql.merge1n('RolePermissions', [ 'role', 'permission' ], 'MANAGER', [])
    await sql.merge1n('RolePermissions', [ 'role', 'permission' ], 'USER', [ 'D', 'A', 'X' ])
    await expect(sql.rows`select * from RolePermissions order by role, permission`).resolves.toEqual([
      { role: 'ADMIN', permission: 'A' },
      { role: 'ADMIN', permission: 'B' },
      { role: 'ADMIN', permission: 'C' },
      { role: 'USER', permission: 'A' },
      { role: 'USER', permission: 'D' },
      { role: 'USER', permission: 'X' }
    ])
  })

})

test('force json mode', async () => {
  await expect(sql.value`select ${Tsql.jsonModify(Tsql.auto({ foo: 1 }), { 'force bar': null })}`).resolves.toEqual(JSON.stringify({
    foo: 1,
    bar: null
  }))
})
