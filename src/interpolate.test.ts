import { test, expect } from '@jest/globals'
import * as Tsql from './index.js'

test('simple', () => {
  const foo = Tsql.template`
    (
      1
    )
  `
  expect(Tsql.template`
  (
    foo = ${foo}
  )
  `.toString()).toEqual([
    '(',
    '  foo = (',
    '    1',
    '  )',
    ')'
  ].join('\n'))
})
