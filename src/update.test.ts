import * as Tsql from './index.js'

test('update', () => {
  expect(Tsql.update('Mr Foos', { id: 1, parentId: null }, { name: 'Foo', bar: null })?.toString()).toEqual(Tsql.demargin(`
    update [Mr Foos] with (repeatableread)
    set
      [name] = N'Foo',
      bar = null
    where (id = 1 and parentId is null)
  `))
})

test('empty where', () => {
  expect(Tsql.update('Xs', {}, { deleted: true })?.toString()).toEqual(Tsql.demargin(`
    update Xs with (repeatableread)
    set
      deleted = cast(1 as bit)
    where 1=1
  `))
})

test('empty', () => {
  expect(Tsql.update('Xs', { id: 1 }, {})).toBe(undefined)
})
