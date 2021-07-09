import * as Tsql from '../index.js'

test('simple', () => {
  expect(Tsql.insertObject('A', { a: undefined, b: null, c: 1, d: '2' }).toString()).toEqual(
    'insert into A (b, c, d) values (null, 1, N\'2\')'
  )
})
