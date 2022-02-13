import * as Tsql from './index.js'

test('is-null', () => {
  expect(Tsql.isNull(null)).toBe(true)
  expect(Tsql.isNull(Tsql.template`null`)).toBe(true)
  expect(Tsql.isNull(Tsql.null)).toBe(true)
  expect(Tsql.isNull(Tsql.template`${undefined}`)).toBe(false)
  expect(Tsql.isNull(undefined)).toBe(false)
  expect(Tsql.isNull(NaN)).toBe(false)
})
