import { test, expect } from '@jest/globals'
import * as Tsql from './index.js'

test('simple', () => {
  expect(Tsql.demargin(`
    foo
    bar
    baz
  `)).toEqual([
    'foo',
    'bar',
    'baz'
  ].join('\n'))
})

test('parens', () => {
  expect(Tsql.demargin(`
    foo = (
      bar
    )
  `)).toEqual([
    'foo = (',
    '  bar',
    ')'
  ].join('\n'))
  expect(Tsql.demargin(`
    (
      foo
    )
  `)).toEqual([
    '(',
    '  foo',
    ')'
  ].join('\n'))
})

test('nested modify_json', () => {
  expect(Tsql.demargin(`
    fooJson = (
      json_modify(
        json_modify(
          json_modify(
            fooJson,
            N'$.foo',
            N'FOO'
          ),
          N'$.bar',
          2
        ),
        N'$.baz',
        cast(1 as bit)
      )
    )
  `)).toEqual([
    'fooJson = (',
    '  json_modify(',
    '    json_modify(',
    '      json_modify(',
    '        fooJson,',
    '        N\'$.foo\',',
    '        N\'FOO\'',
    '      ),',
    '      N\'$.bar\',',
    '      2',
    '    ),',
    '    N\'$.baz\',',
    '    cast(1 as bit)',
    '  )',
    ')'
  ].join('\n'))
})
