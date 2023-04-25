import * as Tsql from './index.js'

test('update', () => {
  expect(Tsql.update('Xs', { id: 1 }, { name: 'foo' }, { hints: [ 'serializable' ] })?.toString()).toEqual(Tsql.template`
    update Xs with (serializable)
    set
      [name] = N'foo'
    where (id = 1)
  `.toString())
})
