import * as Tsql from './index.js'

test('update', () => {
  expect(Tsql.update('Mr Foos', { id: 1, parentId: null }, { name: 'Foo', bar: null })?.toString()).toEqual(Tsql.demargin(`
    update [Mr Foos] with (repeatableread)
    set [name] = N'Foo', bar = null
    where (id = 1 and parentId is null)
  `))
})
