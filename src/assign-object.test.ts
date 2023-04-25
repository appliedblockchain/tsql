import * as Tsql from './index.js'

test('assigns auto values', () => {
  expect(Tsql.assignObject({ foo: 'FOO' })?.toString()).toEqual('foo = N\'FOO\'')
  expect(Tsql.assignObject({ foo: 'FOO', bar: 2, baz: true })?.toString()).toEqual(Tsql.demargin(`
    foo = N'FOO',
    bar = 2,
    baz = cast(1 as bit)
  `))
})

test('assigns json', () => {
  const s = Tsql.assignObject({
    'bar': 'BAR',
    'fooJson->foo': 'FOO',
    'fooJson->bar': 2,
    'fooJson->baz': true
  })?.toString()
  expect(s).toEqual(Tsql.demargin(`
    bar = N'BAR',
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
  `))
})
