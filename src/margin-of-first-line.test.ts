import marginOfFirstLine from './margin-of-first-line.js'

test('marginOfFirstLine', () => {
  expect(marginOfFirstLine('a\n  b')).toEqual('')
  expect(marginOfFirstLine('  a\nb')).toEqual('  ')
  expect(marginOfFirstLine('a\nb')).toEqual('')
  expect(marginOfFirstLine('a\n')).toEqual('')
  expect(marginOfFirstLine('a')).toEqual('')
  expect(marginOfFirstLine('')).toEqual('')
})
