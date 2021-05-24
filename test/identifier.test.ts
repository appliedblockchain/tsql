import id from '../identifier'

test('json value', () => {
  expect(id('fooJson->bar').toString()).toEqual('json_value(fooJson, N\'bar\')')
})

test('quote', () => {
  expect(id('Target').toString()).toEqual('[Target]')
  expect(id('foo[bar').toString()).toEqual('[foo[bar]')
  expect(id('foo]bar').toString()).toEqual('[foo]]bar]')
  expect(id('@foo').toString()).toEqual('@foo')
  expect(id('#foo').toString()).toEqual('#foo')
  expect(id('_foo').toString()).toEqual('_foo')
  expect(id('1foo').toString()).toEqual('[1foo]')
})
