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
  * `{ foo: ... }` – implicit equal
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
  * `{ $nin: [ ... ] }` – alias for `$notIn`
  * `{ $distinct: ... }` – emulated `lhs is distinct from rhs`
  * `{ $notDistinct: ... }` – emulated `lhs is not distinct from rhs`
  * `{ $ndistinct: ... }` – alias for `$notDistinct`

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

## Tsql module

* ```ts
  type jsonValue: (column: string | SanitisedIdentifier, query: string) => SanitisedIdentifier
  ```
  Returns JSON_VALUE(C) built-in function call.

* ```ts
  type jsonQuery: (column: string | SanitisedIdentifier, query?: string) => SanitisedIdentifier
  ```
  Returns JSON_QUERY(C, Q?) built-in function call.

* ```ts
  type and: (...xs: unknown[]) => Sanitised
  ```
  Returns terms joined with AND operator.

  `undefined` terms are filtered out.

  An empty list of terms returns logical true (1=1).

* ```ts
  type assign: (lhs: string | SanitisedIdentifier, rhs: unknown) => Sanitised
  ```
  Returns assigment operator LHS = RHS.

  `undefined` RHS is propagated.

  `null` RHS is left as is LHS = null.

* ```ts
  type assignObject: (record: Record<string, unknown>) => Sanitised
  ```
  Returns assigment clause based on provided record, ie. for UPDATE SET.

  `undefined` entries are filtered out.

  Throws {Error} if provided record doesn't have any non-`undefined` entries.

* ```ts
  type auto: (value: unknown) => Sanitised
  ```
  Returns automatically sanitised value.

  Already sanitised values are returned as is.

  `undefined` and `null` return sanitised `null`.

  Finite numbers return sanitised, decimal numbers.

  Booleans return sanitised `1` (true) or `0` (false).

  Strings return sanitised unicode strings, ie. `N'foo'`.

  Objects return json-stringified, sanitised unicode strings, ie. `{foo:1}` returns `N'{"foo":1}'`.

  Throws {TypeError} for non-finite numbers (not supported by mssql).

  Throws {TypeError} for all other values.

* ```ts
  type columns: (all: Record<string, string | boolean | Sanitised>, filter?: Record<string, boolean>) => Sanitised
  ```
  Returns column projection based on provided record and optional filter.

* ```ts
  type delete: (table: string | SanitisedIdentifier, where?: Sanitised | Record<string, unknown>) => Sanitised
  ```
  Returns DELETE DML for table with optional WHERE clause.

* ```ts
  type distinct: (lhs: string | Sanitised, rhs: unknown) => Sanitised
  ```
  Returns emulated NULL aware comparision.

  MSSQL doesn't support IS DISTINCT FROM comparision directly.

  Single invocation of RHS is not guaranteed.

* ```ts
  type eq: (lhs: string | Sanitised, rhs: unknown) => Sanitised
  ```
  Returns comparision expression.

  `null` RHS returns LHS IS NULL.

  `undefined` RHS propagates.

  See distinct for NULL aware comparision.

* ```ts
  type exists: (table: string | SanitisedIdentifier, where: Sanitised | Record<string, unknown>) => Sanitised
  ```
  Returns EXISTS query for table with WHERE clause.

* ```ts
  type fallback: <T>(x: T, f: (_: Exclude<T, SanitisedIdentifier | Sanitised>) => Sanitised) => Sanitised
  ```
  Returns sanitised value as is, otherwise falls back to provided sanitation function.

* ```ts
  type falseValue: Sanitised
  ```
  Value boolean false – 0 casted as BIT.

  Logical booleans can be used in condition expressions, ie. WHERE clause.

  Value booleans can be used in assignment statements, ie. UPDATE SET clause.

  See falseValue for value boolean variant.

* ```ts
  type gt: (l: string | Sanitised, r: unknown) => Sanitised
  ```
  Returns greater than expression.

  `undefined` RHS is propagated.

* ```ts
  type gte: (l: string | Sanitised, r: unknown) => Sanitised
  ```
  Returns greater than or equal expression.

  `undefined` RHS is propagated.

* ```ts
  type identifier: (x: Identifier) => SanitisedIdentifier
  ```
  Returns sanitised identifier.

  Already sanitised identifiers are returned as is.

  String including `->` is returned as JSON_VALUE(LHS, RHS).

  String including `~>` is returned as JSON_QUERY(LHS, RHS?).

  `.`-separated string is split and joined.

  Strings are quoted if not plain. Non plain string is MSSQL keyword or string containing special characters.

  Above rules are recursive with precedence as listed.

* ```ts
  type identifiers: (...xs: (string | SanitisedIdentifier)[]) => Sanitised
  ```
  Returns comma separated list of provided identifiers.

  See identifier

* ```ts
  type in: (l: string | Sanitised, r: unknown[]) => Sanitised
  ```
  Returns LHS in (RHS) expression.

  `undefined` RHS propagates.

  Falsy or empty array RHS returns logical false.

* ```ts
  type inlineTableOfColumn: (table: string | SanitisedIdentifier, column: string | SanitisedIdentifier, values: unknown[]) => Sanitised
  ```
  Returns single column literal table from provided array of values.

  Throws {Error} if provided values array is empty.

* ```ts
  type inlineTableOfObjects: (table: string | SanitisedIdentifier, objects: readonly Record<string, unknown>[], maybeKeys?: string[]) => Sanitised
  ```
  Returns literal table from provided array of records.

  Throws {Error} if provided values array is empty.

* ```ts
  type insertIgnore: (table: string | SanitisedIdentifier, onKeys: string[], objects: Record<string, unknown>[], maybeObjectKeys?: string[], { hints }?: { hints?: TableHintLimited[]; }) => Sanitised
  ```
  Returns insert DML ignoring existing rows.

  If provided array of objects is empty, returns SELECT 0.

  Optional hits can be provided. Defaults to SERIALIZABLE hint.

* ```ts
  type insertNotMatched: (table: string | SanitisedIdentifier, onKeys: string[], objects: Record<string, unknown>[], maybeObjectKeys?: string[], { hints }?: { hints?: TableHintLimited[]; }) => Sanitised
  ```
  Returns merge DML that runs insert operations on target table from the result of a join with source table.

  Already existing records are skipped.

  This DML is using MERGE statement.

  See insertIgnore for DML based on INSERT and LEFT JOIN.

* ```ts
  type insertObject: (table: string | SanitisedIdentifier, object: Record<string, unknown>) => Sanitised
  ```
  Returns insert DML for single row.

  `undefined` entries are filtered out.

  Throws {TypeError} if there are no non-`undefined` entries.

* ```ts
  type insertObjects: (table: string | SanitisedIdentifier, objects: Record<string, unknown>[], maybeKeys?: string[]) => Sanitised
  ```
  Returns multiple row insert DML.

  See insertIgnore for DML which ignores existing rows.

  See insertNotMatched for DML which ignores existing rows using MERGE statement.

* ```ts
  type is: <Lhs, Rest extends unknown[], R>(f: (lhs: Lhs, ...args: Rest) => R, ...args: Rest) => (lhs: Lhs) => R
  ```
  Returns where clause comparision combinator.

  Usage:

  ```ts
  Tsql.where({ foo: Tsql.is(Tsql.gt, 3) })
  ```

* ```ts
  type json: (x: unknown) => Sanitised
  ```
  Returns stringified json.

  `undefined` value is serialised as NULL.

* ```ts
  type jsonQuery: (column: string | SanitisedIdentifier, query?: string) => SanitisedIdentifier
  ```
  Returns JSON_QUERY(C, Q?) built-in function call.

* ```ts
  type jsonValue: (column: string | SanitisedIdentifier, query: string) => SanitisedIdentifier
  ```
  Returns JSON_VALUE(C) built-in function call.

* ```ts
  type like: (lhs: string | Sanitised, rhs: unknown) => Sanitised
  ```
  Returns LIKE operator.

  `undefined` is propagated.

* ```ts
  type limitedHintsIdentifier: (table: Identifier, hints?: TableHintLimited[]) => Sanitised
  ```
  Returns identifier with optional, [limited hints](https://docs.microsoft.com/en-us/sql/t-sql/queries/hints-transact-sql-table).

* ```ts
  type line: (...elements: unknown[]) => Sanitised
  ```
  Returns space delimited line constructed from provided elements.

  `undefined` values are filtered out.

  Empty list returns sanitized empty string.

  See maybeLine for variant which propagates emtpy list to undefined.

* ```ts
  type lines: <T>(xs: readonly T[], separator: string) => Sanitised
  ```
  Returns lines joined with provided separator.

* ```ts
  type list: <T>(xs: readonly T[], f?: (_: T) => Sanitised) => Sanitised
  ```
  Returns comma separated list of values.

  Optional element to sanitised string mapping can be provided (defaults to auto-sanitation).

* ```ts
  type logicalFalse: Sanitised
  ```
  Simulated logical false – 0=1.

  Logical booleans can be used in condition expressions, ie. WHERE clause.

  Value booleans can be used in assignment statements, ie. UPDATE SET clause.

  See falseValue for value boolean variant.

* ```ts
  type logicalTrue: Sanitised
  ```
  Simulated logical true – 1=1.

  Logical booleans can be used in condition expressions, ie. WHERE clause.

  Value booleans can be used in assignment statements, ie. UPDATE SET clause.

  See trueValue for value boolean variant.

* ```ts
  type lt: (l: string | Sanitised, r: unknown) => Sanitised
  ```
  Returns lower than expression.

  `undefined` RHS is propagated.

* ```ts
  type lte: (l: string | Sanitised, r: unknown) => Sanitised
  ```
  Returns lower than or equal expression.

  `undefined` RHS is propagated.

* ```ts
  type maybeLine: (...elements: unknown[]) => Sanitised
  ```
  Returns space delimited line constructed from provided elements.

  `undefined` values are filtered out.

  Empty list (after filtering out `undefined`) propagates `undefined`.

* ```ts
  type merge1n: (table: string | SanitisedIdentifier, [lcolumn, rcolumn]: [string | SanitisedIdentifier, string | SanitisedIdentifier], lid: unknown, values: unknown[], { hints }?: { ...; }) => Sanitised
  ```
  Returns MERGE DML synchronising 1-n relation.

* ```ts
  type modifyJsons: (table: string | SanitisedIdentifier, entries: readonly Record<string, unknown>[]) => Sanitised
  ```
  Returns MERGE DML for json columns, multiple rows via JSON_MODIFY and JSON_QUERY.

* ```ts
  type ne: (l: string | Sanitised, r: unknown) => Sanitised
  ```
* ```ts
  type ng: (l: string | Sanitised, r: unknown) => Sanitised
  ```
* ```ts
  type nl: (l: string | Sanitised, r: unknown) => Sanitised
  ```
* ```ts
  type not: (rhs: Sanitised) => Sanitised
  ```
* ```ts
  type notDistinct: (lhs: string | Sanitised, rhs: unknown) => Sanitised
  ```
* ```ts
  type notIn: (l: string | Sanitised, r: unknown[]) => Sanitised
  ```
* ```ts
  type now: Sanitised
  ```
* ```ts
  type nstring: (value: string | Sanitised) => Sanitised
  ```
* ```ts
  type null: Sanitised
  ```
* ```ts
  type number: (x: number) => Sanitised
  ```
* ```ts
  type objectId: (name: string) => Sanitised
  ```
* ```ts
  type or: (...xs: unknown[]) => Sanitised
  ```
* ```ts
  type randomIdentifier: (prefix?: string, length?: number) => SanitisedIdentifier
  ```
* ```ts
  type raw: (x: string) => Sanitised
  ```
  Returns force `x` string to be sanitised; no sanitation of any kind is performed.

* ```ts
  type replaceObjects: (table: string | SanitisedIdentifier, onKeys: string[], objects: readonly Record<string, unknown>[], maybeObjectKeys?: string[], maybeUpdateKeys?: string[], maybeInsertKeys?: string[], { hints }?: { ...; }) => Sanitised
  ```
  Returns merge dml that replaces target table with inlined source table.

* ```ts
  type row: <T>(xs: T[], f?: (_: T) => Sanitised) => Sanitised
  ```
  Returns sanitised

* ```ts
  type rowset: <T>(xs: T[]) => Sanitised
  ```
* ```ts
  type Sanitised: typeof Sanitised
  ```
* ```ts
  type SanitisedIdentifier: typeof SanitisedIdentifier
  ```
* ```ts
  type select: (what: Sanitised | (string | Sanitised)[], { from, where }?: { from?: string | SanitisedIdentifier; where?: unknown; }) => Sanitised
  ```
* ```ts
  type star: (table?: string | SanitisedIdentifier) => Sanitised
  ```
* ```ts
  type TableHintLimited: typeof import("/Users/mirek/ab/tsql/table-hint-limited")
  ```
* ```ts
  type template: (ts: TemplateStringsArray, ...vs: unknown[]) => Sanitised
  ```
* ```ts
  type top: (x?: number, ...rest: Sanitised[]) => Sanitised
  ```
  Returns top expression.

  Example top(1, raw('with ties'))

  Example top(1, star)

  Example top(0.1, star) // value in <0,1> range returns percent, ie. `top 10 percent`.

  Example top(1, ids('foo', 'bar', 'baz'))

* ```ts
  type trueValue: Sanitised
  ```
  Value boolean true – 1 casted as BIT.

  Logical booleans can be used in condition expressions, ie. WHERE clause.

  Value booleans can be used in assignment statements, ie. UPDATE SET clause.

  See trueValue for value boolean variant.

* ```ts
  type unix: Sanitised
  ```
* ```ts
  type update: (table: string | SanitisedIdentifier, where: Sanitised | Record<string, unknown>, object: Record<string, unknown>, { hints }?: { hints?: TableHintLimited[]; }) => Sanitised
  ```
* ```ts
  type updateObject: (table: string | SanitisedIdentifier, where: Sanitised | Record<string, unknown>, object: Record<string, unknown>, { hints }?: { hints?: TableHintLimited[]; }) => Sanitised
  ```
* ```ts
  type updateObjects: (table: string | SanitisedIdentifier, onKeys: string[], objects: Record<string, unknown>[], maybeObjectKeys?: string[], maybeUpdateKeys?: string[], { hints }?: { hints?: TableHintLimited[]; }) => Sanitised
  ```
  Returns update dml that runs update operations on target table from the result of a join with source table.

* ```ts
  type upsertObjects: (table: string | SanitisedIdentifier, onKeys: string[], objects: Record<string, unknown>[], maybeObjectKeys?: string[], maybeUpdateKeys?: string[], maybeInsertKeys?: string[], { hints }?: { ...; }) => Sanitised
  ```
  Returns merge dml that runs insert or update operations on target table from the result of a join with source table.

* ```ts
  type where: (value: Where) => Sanitised
  ```
  Returns simple where clause part from object.

* ```ts
  type Where: any
  ```
* ```ts
  type id: (x: Identifier) => SanitisedIdentifier
  ```
  Returns sanitised identifier.

  Already sanitised identifiers are returned as is.

  String including `->` is returned as JSON_VALUE(LHS, RHS).

  String including `~>` is returned as JSON_QUERY(LHS, RHS?).

  `.`-separated string is split and joined.

  Strings are quoted if not plain. Non plain string is MSSQL keyword or string containing special characters.

  Above rules are recursive with precedence as listed.

* ```ts
  type ids: (...xs: (string | SanitisedIdentifier)[]) => Sanitised
  ```
  Returns comma separated list of provided identifiers.

  See identifier

* ```ts
  type S: typeof Sanitised
  ```
* ```ts
  type Sid: typeof SanitisedIdentifier
  ```

## License

MIT License

Copyright 2019 Applied Blockchain

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
