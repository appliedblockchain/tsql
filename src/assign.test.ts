import { test, expect } from '@jest/globals'
import * as Tsql from './index.js'

test('assigns auto values', () => {
  expect(Tsql.assign('foo', 'bar')?.toString()).toEqual('foo = N\'bar\'')
  expect(Tsql.assign('foo', 1)?.toString()).toEqual('foo = 1')
  expect(Tsql.assign('foo', true)?.toString()).toEqual('foo = cast(1 as bit)')
})

test('assigns null', () => {
  expect(Tsql.assign('foo', null)?.toString()).toEqual('foo = null')
})

test('promotes undefined', () => {
  expect(Tsql.assign('foo', undefined)).toEqual(undefined)
})

test('assigns json', () => {
  expect(Tsql.assign('fooJson->bar', 'baz')?.toString()).toEqual(Tsql.demargin(`
    fooJson = json_modify(fooJson, N'$.bar', N'baz')
  `))
})
