import and from './and'
import assign from './assign'
import assignObject from './assign-object'
import auto from './auto'
import columns from './columns'
import delete_ from './delete'
import eq from './eq'
import exists from './exists'
import fallback from './fallback'
import false_ from './false'
import gt from './gt'
import gte from './gte'
import identifier from './identifier'
import identifiers from './identifiers'
import in_ from './in'
import inlineTableOfColumn from './inline-table-of-column'
import inlineTableOfObjects from './inline-table-of-objects'
import insertObject from './insert-object'
import insertObjects from './insert-objects'
import is from './is'
import json from './json'
import like from './like'
import line from './line'
import lines from './lines'
import list from './list'
import lt from './lt'
import lte from './lte'
import maybeWith from './maybe-with'
import merge1n from './merge-1n'
import ne from './ne'
import ng from './ng'
import nl from './nl'
import notIn from './not-in'
import not from './not'
import now from './now'
import nstring from './nstring'
import null_ from './null'
import number_ from './number'
import objectId from './object-id'
import or from './or'
import raw from './raw'
import replaceObjects from './replace-objects'
import row from './row'
import rowset from './rowset'
import Sanitised from './sanitised'
import SanitisedIdentifier from './sanitised-identifier'
import select from './select'
import star from './star'
import template from './template'
import top from './top'
import true_ from './true'
import unix from './unix'
import updateObject from './update-object'
import updateObjects from './update-objects'
import upsertObjects from './upsert-objects'
import where from './where'

// const demargin from './helpers/demargin')
// const interpolate from './helpers/interpolate')
// const interpolate1 from './helpers/interpolate1')
// const isString from './helpers/is-string')
// const keysOfObjects from './helpers/keys-of-objects')
// const quoteString from './helpers/quote-string')

import type S from './sanitised'

export interface t {
  (xs: TemplateStringsArray, ...vs: unknown[]): S
  and: typeof and
  assign: typeof assign
  assignObject: typeof assignObject
  auto: typeof auto
  columns: typeof columns
  delete: typeof delete_
  eq: typeof eq
  exists: typeof exists
  fallback: typeof fallback
  false: typeof false_
  gt: typeof gt
  gte: typeof gte
  identifier: typeof identifier
  identifiers: typeof identifiers
  in: typeof in_
  inlineTableOfColumn: typeof inlineTableOfColumn
  inlineTableOfObjects: typeof inlineTableOfObjects
  insertObject: typeof insertObject
  insertObjects: typeof insertObjects
  is: typeof is,
  json: typeof json
  like: typeof like
  line: typeof line
  lines: typeof lines
  list: typeof list
  lt: typeof lt
  lte: typeof lte
  maybeWith: typeof maybeWith
  merge1n: typeof merge1n
  ne: typeof ne
  ng: typeof ng
  nl: typeof nl
  notIn: typeof notIn
  not: typeof not
  now: typeof now
  nstring: typeof nstring
  null: typeof null_
  number: typeof number_
  objectId: typeof objectId
  or: typeof or
  raw: typeof raw
  replaceObjects: typeof replaceObjects
  row: typeof row
  rowset: typeof rowset
  Sanitised: typeof Sanitised
  SanitisedIdentifier: typeof SanitisedIdentifier
  select: typeof select
  star: typeof star
  template: typeof template
  top: typeof top
  true: typeof true_
  unix: typeof unix
  updateObject: typeof updateObject
  updateObjects: typeof updateObjects
  upsertObjects: typeof upsertObjects
  where: typeof where

  // Aliases
  id: typeof identifier
  ids: typeof identifiers
}

const tsql_ =
  (ts: TemplateStringsArray, ...vs: unknown[]): S =>
    template(ts, ...vs)

const tsql: t =
  Object.assign(tsql_, {
    and,
    assign,
    assignObject,
    auto,
    columns,
    delete: delete_,
    eq,
    exists,
    fallback,
    false: false_,
    gt,
    gte,
    identifier,
    identifiers,
    in: in_,
    inlineTableOfColumn,
    inlineTableOfObjects,
    insertObject,
    insertObjects,
    is,
    json,
    like,
    line,
    lines,
    list,
    lt,
    lte,
    maybeWith,
    merge1n,
    ne,
    ng,
    nl,
    notIn,
    not,
    now,
    nstring,
    null: null_,
    number: number_,
    objectId,
    or,
    raw,
    replaceObjects,
    row,
    rowset,
    Sanitised,
    SanitisedIdentifier,
    select,
    star,
    template,
    top,
    true: true_,
    unix,
    updateObject,
    updateObjects,
    upsertObjects,
    where,

    // Aliases
    id: identifier,
    ids: identifiers
  })

export default tsql
