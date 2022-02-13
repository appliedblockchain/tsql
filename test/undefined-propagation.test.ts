import and from '../and'
import assign from '../assign'
import assignObject from '../assign-object'
import demargin from '../helpers/demargin'
import eq from '../eq'
import gt from '../gt'
import in_ from '../in'
import is from '../is'
import list from '../list'
import or from '../or'
import update from '../update'
import where from '../where'

test('or', () => {
  expect(or(eq('foo', undefined), eq('bar', null), eq('baz', 1)).toString()).toEqual('(bar is null or baz = 1)')
  expect(or(eq('foo', undefined)).toString()).toEqual('0=1')
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

test('update object', () => {
  expect(update('Foo', { a: undefined, b: 1 }, { c: undefined, d: 2 }).toString()).toEqual(demargin(`
    update Foo with (repeatableread)
    set d = 2
    where (b = 1)
  `))
})

test('assign object', () => {
  expect(assignObject({ a: undefined, b: 1, c: null }).toString()).toEqual(demargin(`
    b = 1, c = null
  `))
})

test('assign', () => {
  expect(assign('a', undefined)).toBe(undefined)
  expect(assign('a', null)!.toString()).toBe('a = null')
  expect(assign('a', 1)!.toString()).toBe('a = 1')
})

test('list', () => {
  expect(list([ undefined, 3, undefined, 5, undefined ]).toString()).toEqual('3, 5')
})
