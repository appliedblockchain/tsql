import * as Tsql from './index.js'

test('jsonPath', () => {
  expect(Tsql.jsonPath('foo')).toEqual('$.foo')
  expect(Tsql.jsonPath('foo', { append: true })).toEqual('append $.foo')
  expect(Tsql.jsonPath('foo', { append: true, mode: 'strict' })).toEqual('append strict $.foo')
  expect(Tsql.jsonPath('$.foo')).toEqual('$.foo')
  expect(Tsql.jsonPath('  $.foo')).toEqual('  $.foo')
  expect(Tsql.jsonPath(' append $.foo')).toEqual(' append $.foo')
  expect(Tsql.jsonPath('  append  strict  $.foo')).toEqual('  append  strict  $.foo')
  expect(Tsql.jsonPath('  append  lax  $.foo')).toEqual('  append  lax  $.foo')
})
