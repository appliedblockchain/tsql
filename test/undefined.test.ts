import and from '../and'
import eq from '../eq'
import gt from '../gt'
import is from '../is'
import or from '../or'
import where from '../where'
import in_ from '../in'

test('or', () => {
  expect(or(eq('foo', undefined), eq('bar', null), eq('baz', 1)).toString()).toEqual('(bar is null or baz = 1)')
  expect(or(eq('foo', undefined)).toString()).toEqual('1=0')
})

test('and', () => {
  expect(and(eq('foo', undefined), eq('bar', null), eq('baz', 1)).toString()).toEqual('(bar is null and baz = 1)')
  expect(and(eq('foo', undefined)).toString()).toEqual('1=1')
})

test('where', () => {
  expect(where({ foo: undefined }).toString()).toEqual('1=1')
  expect(where({ foo: is(eq, undefined) }).toString()).toEqual('1=1')
  expect(where({ foo: undefined, bar: 1 }).toString()).toEqual('(bar = 1)')
  expect(where({
    foo: is(eq, undefined),
    bar: is(eq, 1),
    baz: is(gt, 3),
    qux: is(in_, [ 3, 5, 7 ])
  }).toString()).toEqual('(bar = 1 and baz > 3 and qux in (3, 5, 7))')
})
