import * as Tsql from './index.js'

test('simple', () => {
  expect(() => Tsql.lines([])).toThrow('Expected at least one line.')
  expect(() => Tsql.lines([undefined, undefined])).toThrow('Expected at least one line.')
  expect(Tsql.lines(['foo', 'bar'])?.toString()).toEqual(`N'foo'\nN'bar'`)
  expect(Tsql.lines(['foo', undefined, 'bar'])?.toString()).toEqual(`N'foo'\nN'bar'`)
})
