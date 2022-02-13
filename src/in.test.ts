import * as Tsql from './index.js'

test('in', () => {
  expect(Tsql.in('foo', [ 1 ])!.toString()).toEqual('foo in (1)')
  expect(Tsql.in('foo', [])!.toString()).toEqual('0=1')
  expect(Tsql.in('foo', null)!.toString()).toEqual('0=1')
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
    (id in (42, 43, 44) and [status] in (N'COMPLETED', N'PARTIALLY_COMPLETED') and 0=1 and 0=1)
  `))
})
