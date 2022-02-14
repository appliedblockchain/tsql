import * as Tsql from './index.js'

test('literalTableOfObjects', () => {
  const table = [
    { id: 42, name: 'foo' },
    { id: 43, name: 'bar' }
  ]
  expect(Tsql.template`select * from ${Tsql.inlineTableOfObjects('Foo Bar', table)}`.toString()).toEqual(Tsql.template`
    select * from (values
      (42, N\'foo\'),
      (43, N\'bar\')
    ) as [Foo Bar] (id, [name])
  `.toString())
})
