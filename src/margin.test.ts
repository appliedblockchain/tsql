import { test, expect } from '@jest/globals'
import * as Tsql from './index.js'

test('margin', () => {
  const lines = Tsql.lines([ 'foo', 'bar', 'baz' ], ',\n')
  expect(Tsql.template`
    foo (
      ${lines}
    )
  `.toString()).toEqual(`foo (
  N'foo',
  N'bar',
  N'baz'
)`)
})

test('margin with multiline', () => {
  const value = 'a\nb\r\nc\nd'
  expect(Tsql.template`
    insert into t(a)
    values (
      ${value}
    )
  `.toString()).toEqual(`insert into t(a)
values (
  concat_ws(nchar(13) + nchar(10), concat_ws(nchar(10), N'a', N'b'), concat_ws(nchar(10), N'c', N'd'))
)`)
})
