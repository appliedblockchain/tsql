## Summary

Transact-SQL template combinators.

## Playground

[Observable playground](https://observablehq.com/@mirek/tsql-examples)

## Usage

```
npm i -E @appliedblockchain/tsql
```

```
import tsql from '@appliedblockchain/tsql`

const id = '1; delete from Foo;'
console.log(tsql`select * from Foo where id = ${id}`)

// no sql-injection
// "select * from Foo where id = N'1; delete from Foo;'"
```

## Architecture

[Tagged templates](#tagged-templates) and functional combinators are used to sanitise and help with generating Microsoft SQL's T-SQL queries.

Basic combinators (eq, gt, in etc.) are provided together with more complex ones (merge1n, inline-table-*, upsert-objects etc).

### Auto sanitation

Values used in templates go through auto sanitation:

- sanitised values are left as is
- `undefined` and `null` become sanitised `null`
- finite numbers become sanitised decimal numbers
- booleans are sanitised as `1` (true) or `0` (false)
- strings are sanitised as unicode string `N'foo'`
- objects are sanitised as json stringified unicode strings, ie. `{foo:1}` becomes `N'{"foo":1}'`
- non-finite numbers throw as they are not supported by mssql
- all other values throw

### `undefined` propagation

Binary operators (eq, ne, gt, gte, lt, lte, in, notIn), logical operators (and, or) and where clauses perform `undefined` propagation:

- when right hand side of binary operator is `undefined` the whole term (returned result) is also `undefined`
- `and`, `or` and `where` combinators omit `undefined` values

Above means that `undefined` values are composed to generate desired sql queries.

Typescript's type system can be leveraged:

```
// Allow querying for specific numeric value only. Please note only finite values are supported – `Infinity`, `-Infinity`, `NaN` will throw.
const query =
  ({ deletedAt }: { deletedAt: number }) =>
    tsql`select * from Foo where ${tsql.where(where)}`

// Allow ommiting param.
const query =
  ({ deletedAt }: { deletedAt?: number }) =>
    tsql`select * from Foo where ${tsql.where(where)}`

// Allow ommiting or explicitly using `undefined` value to omit value.
const query =
  ({ deletedAt }: { deletedAt?: undefined | number }) =>
    tsql`select * from Foo where ${tsql.where(where)}`

// Allow `null` (`deletedAt is null`) or number.
const query =
  ({ deletedAt }: { deletedAt: null | number }) =>
    tsql`select * from Foo where ${tsql.where(where)}`

// Allow ommiting, explicit `undefined` (omit), `null` (`... is null`) or number.
const query =
  ({ deletedAt }: { deletedAt?: undefined | null | number }) =>
    tsql`select * from Foo where ${tsql.where(where)}`
```

### No exact object type in typescript

It is worth noting that, unlike flow, typescript unfortunatelly doesn't support exact object types.

What this means is that the following form should be avoided:

```
// BAD
const query =
  (where: { deletedAt: number }) =>
    tsql`select * from Foo where ${tsql.where(where)}`
```

Instead use destructuring to simulate exactness:

```
const query =
  ({ deletedAt }: { deletedAt: number }) =>
    tsql`select * from Foo where ${tsql.where({ deletedAt })}`
```

It won't flag invalid usage during type check but the function will behave as expected from the type definition.

### `where` currying

When using `where` combinator, `is`-currying combinator is very handy which defers first argument application.
`where` combinator is aware of those curried functions and will inject the first argument (left hand side of binary operator) using the key name:

```
tsql`select * from Foo where ${where({ foo: is(gt, 5) })}`
// select * from Foo where foo > 5
```

### MongoDB like where queries

`where` combinator supports MongoDB like queries:

```
const where = { id: { $gt: 123 }, state: { $in: [ 'PENDING', 'RETRY' ] } }
tsql`select * from Foo ${tsql.where(where)}`
```

Supported operators:
* unary
  * `{ $not: ... }`
* logical
  * `{ $or: [ ... ] }`
  * `{ $and: [ ... ] }`
  * `{ foo: ..., bar: ... }` - implicitly `and`
* binary
  * `{ foo: ... }` – implicitly equal
  * `{ $eq: ... }`
  * `{ $gt: ... }`
  * `{ $gte: ... }`
  * `{ $in: ... }`
  * `{ $like: ... }` – [mssql like pattern matching](https://docs.microsoft.com/en-us/sql/t-sql/language-elements/like-transact-sql?view=sql-server-ver15)
  * `{ $lt: ... }`
  * `{ $lte: ... }`
  * `{ $ne: ... }`
  * `{ $ng: ... }` – not greater
  * `{ $nl: ... }` – not less
  * `{ $notIn: [ ... ] }`

### Json value identifiers

Identifiers of `C->Q` form are expanded to `json_value(C, Q)` form.
Identifiers of `C~>Q` form are expanded to `json_query(C, Q)` form, where `Q` is optional.

```js
tsql.updateObject('Actions', { 'payloadJson->$.retries': { $gt: 3 } }, { status: 'CANCELLED' })
```

Renders:

```sql
update Actions
set status = N'CANCELLED'
where (json_value(payloadJson, N'$.retries') > 3)
```

## License

MIT License

Copyright 2019 Applied Blockchain

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
