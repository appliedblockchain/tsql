// @flow

const and = require('./and')
const assign = require('./assign')
const assignObject = require('./assign-object')
const auto = require('./auto')
const columns = require('./columns')
const delete_ = require('./delete')
const eq = require('./eq')
const exists = require('./exists')
const fallback = require('./fallback')
const gt = require('./gt')
const gte = require('./gte')
const identifier = require('./identifier')
const identifiers = require('./identifiers')
const in_ = require('./in')
const inlineTableOfColumn = require('./inline-table-of-column')
const inlineTableOfObjects = require('./inline-table-of-objects')
const insertObject = require('./insert-object')
const json = require('./json')
const line = require('./line')
const list = require('./list')
const lt = require('./lt')
const lte = require('./lte')
const merge1n = require('./merge-1n')
const ne = require('./ne')
const ng = require('./ng')
const nl = require('./nl')
const notIn = require('./not-in')
const now = require('./now')
const nstring = require('./nstring')
const null_ = require('./null')
const number_ = require('./number')
const objectId = require('./object-id')
const or = require('./or')
const raw = require('./raw')
const row = require('./row')
const rowset = require('./rowset')
const Sanitised = require('./sanitised')
const SanitisedIdentifier = require('./sanitised-identifier')
const select = require('./select')
const star = require('./star')
const template = require('./template')
const top = require('./top')
const unix = require('./unix')
const updateObject = require('./update-object')
const where = require('./where')

// const demargin = require('./helpers/demargin')
// const interpolate = require('./helpers/interpolate')
// const interpolate1 = require('./helpers/interpolate1')
// const isString = require('./helpers/is-string')
// const keysOfObjects = require('./helpers/keys-of-objects')
// const quoteString = require('./helpers/quote-string')

/*::

import S from './sanitised'

export type Tsql = {
  (string[], ...mixed[]): S;
  and: typeof and;
  assign: typeof assign;
  assignObject: typeof assignObject;
  auto: typeof auto;
  columns: typeof columns;
  delete: typeof delete_;
  eq: typeof eq;
  exists: typeof exists;
  fallback: typeof fallback;
  gt: typeof gt;
  gte: typeof gte;
  identifier: typeof identifier;
  identifiers: typeof identifiers;
  in: typeof in_;
  inlineTableOfColumn: typeof inlineTableOfColumn;
  inlineTableOfObjects: typeof inlineTableOfObjects;
  insertObject: typeof insertObject;
  json: typeof json;
  line: typeof line;
  list: typeof list;
  lt: typeof lt;
  lte: typeof lte;
  merge1n: typeof merge1n;
  ne: typeof ne;
  ng: typeof ng;
  nl: typeof nl;
  notIn: typeof notIn;
  now: typeof now;
  nstring: typeof nstring;
  null: typeof null_;
  number: typeof number_;
  objectId: typeof objectId;
  or: typeof or;
  raw: typeof raw;
  row: typeof row;
  rowset: typeof rowset;
  Sanitised: typeof Sanitised;
  SanitisedIdentifier: typeof SanitisedIdentifier;
  select: typeof select;
  star: typeof star;
  template: typeof template;
  top: typeof top;
  unix: typeof unix;
  updateObject: typeof updateObject;
  where: typeof where;

  // Aliases
  id: typeof identifier;
  ids: typeof identifiers;
}

*/

const tsql /*: Tsql */ =
  (ts, ...vs) =>
    template(ts, ...vs)

Object.assign(tsql, {
  and,
  assign,
  assignObject,
  auto,
  columns,
  delete: delete_,
  eq,
  exists,
  fallback,
  gt,
  gte,
  identifier,
  identifiers,
  in: in_,
  inlineTableOfColumn,
  inlineTableOfObjects,
  insertObject,
  json,
  line,
  list,
  lt,
  lte,
  merge1n,
  ne,
  ng,
  nl,
  notIn,
  now,
  nstring,
  null: null_,
  number: number_,
  objectId,
  or,
  raw,
  row,
  rowset,
  Sanitised,
  SanitisedIdentifier,
  select,
  star,
  template,
  top,
  unix,
  updateObject,
  where,

  // Aliases
  id: identifier,
  ids: identifiers
})

module.exports = tsql
