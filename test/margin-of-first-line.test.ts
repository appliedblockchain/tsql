import marginOfFirstLine from '../helpers/margin-of-first-line'

test('marginOfFirstLine', () => {
  expect(marginOfFirstLine('a\n  b')).toEqual('')
  expect(marginOfFirstLine('  a\nb')).toEqual('  ')
  expect(marginOfFirstLine('a\nb')).toEqual('')
  expect(marginOfFirstLine('a\n')).toEqual('')
  expect(marginOfFirstLine('a')).toEqual('')
  expect(marginOfFirstLine('')).toEqual('')
})
