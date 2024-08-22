import { test, expect } from '@jest/globals'
import * as Tsql from './index.js'

test('order-by', () => {
  expect(Tsql.orderBy([])).toBe(undefined)
  expect(Tsql.orderBy([ [ undefined, 'asc' ] ])).toBe(undefined)
  expect(Tsql.orderBy([ [ undefined, 'asc' ], [ 'foo bar', 'desc' ], [ 'baz', 'asc' ] ])?.toString())
    .toBe('[foo bar] desc, baz asc')
})
