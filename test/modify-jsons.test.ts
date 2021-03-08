import demargin from '../helpers/demargin'
import modifyJsons from '../modify-jsons'

test('simple', () => {
  const objects = [
    { id: 1, foo: 1, bar: [ 1, null, 1.1 ] },
    { id: 2, foo: 2, bar: [ 2, null, 2.2 ] }
  ]
  expect(modifyJsons('T', 'payloadJson', [ 'id' ], objects).toString()).toEqual(demargin(`
    merge T as Target
    using (values (1, 1, N'[1,null,1.1]'), (2, 2, N'[2,null,2.2]')) as Source (id, foo, bar)
    on (Source.id = Target.id)
    when matched then
      update set payloadJson = json_modify(json_modify(payloadJson, N'$.foo', json_query(Source.foo)), N'$.bar', json_query(Source.bar));
  `))
})
