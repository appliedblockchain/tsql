import * as Tsql from './index.js'

test('or', () => {
  expect(Tsql.or(Tsql.eq('foo', undefined), Tsql.eq('bar', null), Tsql.eq('baz', 1)).toString()).toEqual('(bar is null or baz = 1)')
  expect(Tsql.or(Tsql.eq('foo', undefined)).toString()).toEqual('0=1')
})

test('and', () => {
  expect(Tsql.and(Tsql.eq('foo', undefined), Tsql.eq('bar', null), Tsql.eq('baz', 1)).toString()).toEqual('(bar is null and baz = 1)')
  expect(Tsql.and(Tsql.eq('foo', undefined)).toString()).toEqual('1=1')
})

test('where', () => {
  expect(Tsql.where({ foo: undefined }).toString()).toEqual('1=1')
  expect(Tsql.where({ foo: Tsql.is(Tsql.eq, undefined) }).toString()).toEqual('1=1')
  expect(Tsql.where({ foo: undefined, bar: 1 }).toString()).toEqual('(bar = 1)')
  expect(Tsql.where({
    foo: Tsql.is(Tsql.eq, undefined),
    bar: Tsql.is(Tsql.eq, 1),
    baz: Tsql.is(Tsql.gt, 3),
    qux: Tsql.is(Tsql.in, [ 3, 5, 7 ])
  }).toString()).toEqual('(bar = 1 and baz > 3 and qux in (3, 5, 7))')
})

test('update object', () => {
  expect(Tsql.update('Foo', { a: undefined, b: 1 }, { c: undefined, d: 2 })?.toString()).toEqual(Tsql.demargin(`
    update Foo with (repeatableread)
    set d = 2
    where (b = 1)
  `))
})

test('update object with undefined propagation', () => {
  expect(Tsql.update('Foo', { a: undefined, b: undefined }, { c: undefined, d: undefined })).toEqual(undefined)
})

test('assign object', () => {
  expect(Tsql.assignObject({ a: undefined, b: 1, c: null })?.toString()).toEqual(
    'b = 1, c = null'
  )
})

test('assign object with undefined propagation', () => {
  expect(Tsql.assignObject({ a: undefined, b: undefined, c: undefined })).toEqual(undefined)
})

test('assign', () => {
  expect(Tsql.assign('a', undefined)).toBe(undefined)
  expect(Tsql.assign('a', null)!.toString()).toBe('a = null')
  expect(Tsql.assign('a', 1)!.toString()).toBe('a = 1')
})

test('list', () => {
  expect(Tsql.list([ undefined, 3, undefined, 5, undefined ])?.toString()).toEqual('3, 5')
})
