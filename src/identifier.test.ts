import { test, expect } from '@jest/globals'
import * as Tsql from './index.js'

test('basic', () => {
  expect(Tsql.id('foo') instanceof Tsql.S).toBe(true)
  expect(Tsql.id('foo') instanceof Tsql.Sid).toBe(true)
  expect(String(Tsql.id('foo'))).toEqual('foo')
  expect(String(Tsql.id('foo.bar'))).toEqual('foo.bar')
  expect(String(Tsql.id('fo o.bar'))).toEqual('[fo o].bar')
  expect(String(Tsql.id('fo o.ba r'))).toEqual('[fo o].[ba r]')
  expect(String(Tsql.id(Tsql.id('fo o.ba r')))).toEqual('[fo o].[ba r]')
})

test('json value', () => {
  expect(Tsql.id('fooJson->bar').toString()).toEqual('json_value(fooJson, N\'bar\')')
})

test('json query', () => {
  expect(Tsql.id('fooJson~>bar').toString()).toEqual('json_query(fooJson, N\'bar\')')
})

test('json path exists', () => {
  expect(Tsql.id('fooJson?>bar').toString()).toEqual('json_path_exists(fooJson, N\'bar\')')
})

test('quote', () => {
  expect(Tsql.id('Target').toString()).toEqual('[Target]')
  expect(Tsql.id('foo[bar').toString()).toEqual('[foo[bar]')
  expect(Tsql.id('foo]bar').toString()).toEqual('[foo]]bar]')
  expect(Tsql.id('@foo').toString()).toEqual('@foo')
  expect(Tsql.id('#foo').toString()).toEqual('#foo')
  expect(Tsql.id('_foo').toString()).toEqual('_foo')
  expect(Tsql.id('1foo').toString()).toEqual('[1foo]')
})
