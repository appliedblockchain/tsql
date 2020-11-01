import tsql from '..'

test('margin', () => {
  const lines = tsql.lines([ 'foo', 'bar', 'baz' ], ',\n')
  expect(tsql`
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
  expect(tsql`
    insert into t(a)
    values (
      ${value}
    )
  `.toString()).toEqual(`insert into t(a)
values (
  concat_ws(nchar(13) + nchar(10), concat_ws(nchar(10), N'a', N'b'), concat_ws(nchar(10), N'c', N'd'))
)`)
})
