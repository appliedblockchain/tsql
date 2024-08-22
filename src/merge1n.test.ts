import { test, expect } from '@jest/globals'
import * as Tsql from './index.js'

test('merge1n', () => {
  const fooId = 42
  const barIds = [ 3, 5, 7 ]
  expect(Tsql.merge1n('Foo Bars', [ 'foo Id', 'bar Id' ], fooId, barIds).toString()).toEqual(Tsql.demargin(`
    merge [Foo Bars] with (serializable) as [Target]
    using (values
      (3),
      (5),
      (7)
    ) as [Source] (id)
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
