import demargin from '../helpers/demargin'
import modifyJsons from '../modify-jsons'

test('simple', () => {
  const objects = [
    { id: 1, payloadJson: { foo: 1, bar: [ 1, null, 1.1 ] } },
    { id: 2, payloadJson: { foo: 2, bar: [ 2, null, 2.2 ] } }
  ]
  expect(modifyJsons('T', objects).toString()).toEqual(demargin(`
    merge T as Target
    using (values (1, N'{"foo":1,"bar":[1,null,1.1]}'), (2, N'{"foo":2,"bar":[2,null,2.2]}')) as Source (id, payloadJson)
    on (Source.id = Target.id)
    when matched then
      update set Target.payloadJson = json_modify(json_modify(Target.payloadJson, N'$.foo', json_query(Source.payloadJson, N'$.foo')), N'$.bar', json_query(Source.payloadJson, N'$.bar'));
  `))
})
