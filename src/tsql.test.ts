import * as Tsql from './index.js'

test('identifier', () => {
  expect(Tsql.id('foo') instanceof Tsql.S).toBe(true)
  expect(Tsql.id('foo') instanceof Tsql.Sid).toBe(true)
  expect(String(Tsql.id('foo'))).toEqual('foo')
  expect(String(Tsql.id('foo.bar'))).toEqual('foo.bar')
  expect(String(Tsql.id('fo o.bar'))).toEqual('[fo o].bar')
  expect(String(Tsql.id('fo o.ba r'))).toEqual('[fo o].[ba r]')
  expect(String(Tsql.id(Tsql.id('fo o.ba r')))).toEqual('[fo o].[ba r]')
})

test('insertObject', () => {
  expect(Tsql.insertObject('Foo', { id: 1, name: 'bar', deleted: false }).toString()).toEqual(
    'insert into Foo (id, [name], deleted) values (1, N\'bar\', cast(0 as bit))'
  )
})

test('literalTableOfObjects', () => {
  const table = [
    { id: 42, name: 'foo' },
    { id: 43, name: 'bar' }
  ]
  expect(Tsql.template`select * from ${Tsql.inlineTableOfObjects('Foo Bar', table)}`.toString()).toEqual(
    'select * from (values (42, N\'foo\'), (43, N\'bar\')) as [Foo Bar] (id, [name])'
  )
})

test('merge1n', () => {
  const fooId = 42
  const barIds = [ 3, 5, 7 ]
  expect(Tsql.merge1n('Foo Bars', [ 'foo Id', 'bar Id' ], fooId, barIds).toString()).toEqual(Tsql.demargin(`
    merge [Foo Bars] with (serializable) as [Target]
    using (values (3), (5), (7)) as [Source] (id)
    on (
      [Target].[foo Id] = 42 and
      [Target].[bar Id] = [Source].id
    )
    when not matched by target then
      insert ([foo Id], [bar Id])
      values (42, [Source].id)
    when not matched by source and [Target].[foo Id] = 42 then
      delete;
  `))
})

test('update', () => {
  expect(Tsql.update('Mr Foos', { id: 1, parentId: null }, { name: 'Foo', bar: null })?.toString()).toEqual(Tsql.demargin(`
    update [Mr Foos] with (repeatableread)
    set [name] = N'Foo', bar = null
    where (id = 1 and parentId is null)
  `))
})

test('in', () => {
  expect(
    Tsql.and(
      Tsql.in('id', [ 42, 43, 44 ]),
      Tsql.in('status', [ 'COMPLETED', 'PARTIALLY_COMPLETED' ]),
      Tsql.in('empty', []),
      Tsql.in('null_', null),
      Tsql.in('undefined_', undefined)
    ).toString()
  ).toEqual(Tsql.demargin(`
    (id in (42, 43, 44) and [status] in (N'COMPLETED', N'PARTIALLY_COMPLETED') and 0=1 and 0=1)
  `))
})
