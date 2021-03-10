import tsql from '..'
import S from '../sanitised'
import Sid from '../sanitised-identifier'
import demargin from '../helpers/demargin'

test('identifier', () => {
  expect(tsql.id('foo') instanceof S).toBe(true)
  expect(tsql.id('foo') instanceof Sid).toBe(true)
  expect(String(tsql.id('foo'))).toEqual('foo')
  expect(String(tsql.id('foo.bar'))).toEqual('foo.bar')
  expect(String(tsql.id('fo o.bar'))).toEqual('[fo o].bar')
  expect(String(tsql.id('fo o.ba r'))).toEqual('[fo o].[ba r]')
  expect(String(tsql.id(tsql.id('fo o.ba r')))).toEqual('[fo o].[ba r]')
})

test('insertObject', () => {
  expect(tsql.insertObject('Foo', { id: 1, name: 'bar', deleted: false }).toString()).toEqual(
    'insert into Foo (id, name, deleted) values (1, N\'bar\', cast(0 as bit))'
  )
})

test('literalTableOfObjects', () => {
  const table = [
    { id: 42, name: 'foo' },
    { id: 43, name: 'bar' }
  ]
  expect(tsql`select * from ${tsql.inlineTableOfObjects('Foo Bar', table)}`.toString()).toEqual(
    'select * from (values (42, N\'foo\'), (43, N\'bar\')) as [Foo Bar] (id, name)'
  )
})

test('merge1n', () => {
  const fooId = 42
  const barIds = [ 3, 5, 7 ]
  expect(tsql.merge1n('Foo Bars', [ 'foo Id', 'bar Id' ], fooId, barIds).toString()).toEqual(demargin(`
    merge [Foo Bars] as Target
    using (values (3), (5), (7)) as Source (id)
    on (
      Target.[foo Id] = 42 and
      Target.[bar Id] = Source.id
    )
    when not matched by target then
      insert ([foo Id], [bar Id])
      values (42, Source.id)
    when not matched by source and Target.[foo Id] = 42 then
      delete;
  `))
})

test('updateObject', () => {
  expect(tsql.updateObject('Mr Foos', { id: 1, parentId: null }, { name: 'Foo', bar: null }).toString()).toEqual(demargin(`
    update [Mr Foos]
    set name = N'Foo', bar = null
    where (id = 1 and parentId is null)
  `))
})

test('in', () => {
  expect(
    tsql.and(
      tsql.in('id', [ 42, 43, 44 ]),
      tsql.in('status', [ 'COMPLETED', 'PARTIALLY_COMPLETED' ]),
      tsql.in('empty', []),
      tsql.in('null_', null),
      tsql.in('undefined_', undefined)
    ).toString()
  ).toEqual(demargin(`
    (id in (42, 43, 44) and status in (N'COMPLETED', N'PARTIALLY_COMPLETED') and 0=1 and 0=1)
  `))
})
