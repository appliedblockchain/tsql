import id from '../identifier'

test('json value', () => {
  expect(id('fooJson->bar').toString()).toEqual('json_value(fooJson, N\'bar\')')
})
