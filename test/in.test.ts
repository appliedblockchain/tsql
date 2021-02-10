import in_ from '../in'

test('in', () => {
  expect(in_('foo', [ 1 ])!.toString()).toEqual('foo in (1)')
  expect(in_('foo', [])!.toString()).toEqual('1=0')
  expect(in_('foo', null)!.toString()).toEqual('1=0')
  expect(typeof in_('foo', undefined)).toBe('undefined')
})
