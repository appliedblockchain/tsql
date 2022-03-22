import * as Tsql from './index.js'

const t =
  (a: Record<string, unknown>, b: string): void =>
    expect(Tsql.where(a).toString()).toEqual(b)

test('simple', () => {
  t({ foo: 1 }, '(foo = 1)')
  t({ foo: { $gt: 1 } }, '(foo > 1)')
  t({ $and: [ { foo: { $gt: 1 } }, { foo: { $lt: 10 } } ] }, '((foo > 1) and (foo < 10))')
})

test('sanitised', () => {
  t({ $and: [ { foo: 1 }, { bar: 2 }, Tsql.raw('baz in (0)') ] }, '((foo = 1) and (bar = 2) and baz in (0))')
})

test('nested is', () => {
  t({
    $and: [
      { $not: { foo: { $gt: 1 } } },
      { foo: { $not: { $lt: 10 } } },
      { $or: [
        { baz: 5 },
        { baz: Tsql.is(Tsql.gt, 10) }
      ] }
    ]
  }, '(not ((foo > 1)) and (foo = N\'{"$not":{"$lt":10}}\') and ((baz = 5) or (baz > 10)))')
})

test('stop at leaf', () => {
  t({ foo: { $not: { $lt: 10 } } }, '(foo = N\'{"$not":{"$lt":10}}\')')
})

test('different ops', () => {
  t({
    $and: [
      { a: { $in: [ 1, 2, 3 ] } },
      { b: { $like: 'foo%' } },
      { c: { $gte: 5 } },
      { d: { $lte: 1 } },
      { e: { $lt: 0 } },
      { f: { $notIn: [ 3, 5, 7 ] } },
      { g: { $eq: 3 } },
      { h: { $ne: 0 } },
      { i: { $ng: 1 } },
      { j: { $nl: -1 } },
      { $or: [
        { $not: { k: 0 } },
        { l: 1 }
      ] },
      { m: { $between: [ 0, 1 ] } },
      { n: { $notBetween: [ 0, 1 ] } }
    ]
  }, '((a in (1, 2, 3)) and (b like N\'foo%\') and (c >= 5) and (d <= 1) and (e < 0) and (f not in (3, 5, 7)) and (g = 3) and (h <> 0) and (i !> 1) and (j !< -1) and (not ((k = 0)) or (l = 1)) and (m between 0 and 1) and (n not between 0 and 1))')
})

test('json', () => {
  expect(Tsql.where({ 'payloadJson->status': 'COMPLETED' }).toString()).toEqual('(json_value(payloadJson, N\'status\') = N\'COMPLETED\')')
})
