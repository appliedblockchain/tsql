import { test, expect } from '@jest/globals'
import * as Tsql from './index.js'

test('insert-object', () => {
  expect(Tsql.insertObject('A', { a: undefined, b: null, c: 1, d: '2' }).toString()).toEqual(
    'insert into A (b, c, d) values (null, 1, N\'2\')'
  )
  expect(Tsql.insertObject('Foo', { id: 1, name: 'bar', deleted: false }).toString()).toEqual(
    'insert into Foo (id, [name], deleted) values (1, N\'bar\', cast(0 as bit))'
  )
  expect(Tsql.insertObject('Foo', { id: 1, name: 'bar', deleted: false }).toString()).toEqual(
    'insert into Foo (id, [name], deleted) values (1, N\'bar\', cast(0 as bit))'
  )
})
