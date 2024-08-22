import { test, expect } from '@jest/globals'
import * as Tsql from './index.js'

test('in', () => {
  expect(String(Tsql.in('foo', [ 1 ]))).toEqual('foo in (1)')
  expect(String(Tsql.in('foo', []))).toEqual('0=1')
  expect(String(Tsql.in('foo', null))).toEqual('0=1')
  expect(typeof Tsql.in('foo', undefined)).toBe('undefined')
  expect(
    Tsql.and(
      Tsql.in('id', [ 42, 43, 44 ]),
      Tsql.in('status', [ 'COMPLETED', 'PARTIALLY_COMPLETED' ]),
      Tsql.in('empty', []),
      Tsql.in('null_', null),
      Tsql.in('undefined_', undefined)
    ).toString()
  ).toEqual(Tsql.demargin(`
    (id in (42, 43, 44) and [status] in (N'COMPLETED', N'PARTIALLY_COMPLETED') and 0=1)
  `))
})
