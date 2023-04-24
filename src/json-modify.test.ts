import * as Tsql from './index.js'

test('jsonModify', () => {
  expect(Tsql.jsonModify(Tsql.raw('fooJson'), { foo: 'value', bar: 1, baz: false, ref: Tsql.raw('Xs.ref') }).toString()).toEqual(Tsql.demargin(`
    json_modify(
      json_modify(
        json_modify(
          json_modify(
            fooJson,
            N'$.foo',
            N'value'
          ),
          N'$.bar',
          1
        ),
        N'$.baz',
        cast(0 as bit)
      ),
      N'$.ref',
      Xs.ref
    )
  `))
})
