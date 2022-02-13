import marginOfLastLine from './margin-of-last-line.js'

test('marginOfLastLine', () => {
  expect(marginOfLastLine('')).toEqual('')
  expect(marginOfLastLine(' ')).toEqual(' ')
  expect(marginOfLastLine(' \t')).toEqual(' \t')
  expect(marginOfLastLine('\t ')).toEqual('\t ')
  expect(marginOfLastLine('\n')).toEqual('')
  expect(marginOfLastLine('\n ')).toEqual(' ')
  expect(marginOfLastLine('foo\nbar\n  baz')).toEqual('  ')
  expect(marginOfLastLine('foo\nbar\n  baz\n')).toEqual('')
})
