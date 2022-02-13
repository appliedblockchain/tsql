import * as Tsql from './index.js'

test('in', () => {
  expect(Tsql.in('foo', [ 1 ])!.toString()).toEqual('foo in (1)')
  expect(Tsql.in('foo', [])!.toString()).toEqual('0=1')
  expect(Tsql.in('foo', null)!.toString()).toEqual('0=1')
  expect(typeof Tsql.in('foo', undefined)).toBe('undefined')
})
