import * as TableHintLimited from './table-hint-limited'
import and from './and'
import assign from './assign'
import assignObject from './assign-object'
import auto from './auto'
import columns from './columns'
import delete_ from './delete'
import distinct from './distinct'
import eq from './eq'
import exists from './exists'
import fallback from './fallback'
import falseValue from './false-value'
import gt from './gt'
import gte from './gte'
import identifier from './identifier'
import identifiers from './identifiers'
import in_ from './in'
import inlineTableOfColumn from './inline-table-of-column'
import inlineTableOfObjects from './inline-table-of-objects'
import insertIgnore from './insert-ignore'
import insertNotMatched from './insert-not-matched'
import insertObject from './insert-object'
import insertObjects from './insert-objects'
import is from './is'
import json from './json'
import jsonQuery from './json-query'
import jsonValue from './json-value'
import like from './like'
import limitedHintsIdentifier from './limited-hints-identifier'
import line from './line'
import lines from './lines'
import list from './list'
import logicalFalse from './logical-false'
import logicalTrue from './logical-true'
import lt from './lt'
import lte from './lte'
import merge1n from './merge-1n'
import modifyJsons from './modify-jsons'
import ne from './ne'
import ng from './ng'
import nl from './nl'
import not from './not'
import notDistinct from './not-distinct'
import notIn from './not-in'
import now from './now'
import nstring from './nstring'
import null_ from './null'
import number_ from './number'
import objectId from './object-id'
import or from './or'
import randomIdentifier from './random-identifier'
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
import trueValue from './true-value'
import type { Where } from './where'
import unix from './unix'
import update from './update'
import updateObjects from './update-objects'
import upsertObjects from './upsert-objects'
import where from './where'

// const interpolate from './helpers/interpolate')
// const interpolate1 from './helpers/interpolate1')
// const isString from './helpers/is-string')
// const keysOfObjects from './helpers/keys-of-objects')
// const quoteString from './helpers/quote-string')

export {
  and,
  assign,
  assignObject,
  auto,
  columns,
  delete_ as delete,
  distinct,
  eq,
  exists,
  fallback,
  falseValue,
  gt,
  gte,
  identifier,
  identifiers,
  in_ as in,
  inlineTableOfColumn,
  inlineTableOfObjects,
  insertIgnore,
  insertNotMatched,
  insertObject,
  insertObjects,
  is,
  json,
  jsonQuery,
  jsonValue,
  like,
  limitedHintsIdentifier,
  line,
  lines,
  list,
  logicalFalse,
  logicalTrue,
  lt,
  lte,
  merge1n,
  modifyJsons,
  ne,
  ng,
  nl,
  not,
  notDistinct,
  notIn,
  now,
  nstring,
  null_ as null,
  number_ as number,
  objectId,
  or,
  randomIdentifier,
  raw,
  replaceObjects,
  row,
  rowset,
  Sanitised,
  SanitisedIdentifier,
  select,
  star,
  TableHintLimited,
  template,
  top,
  trueValue,
  unix,
  update,

  /** @deprecated @use `update` */
  update as updateObject,

  updateObjects,
  upsertObjects,
  where,
  Where,

  // Aliases
  identifier as id,
  identifiers as ids,
  Sanitised as S,
  SanitisedIdentifier as Sid
}

export interface t {
  (xs: TemplateStringsArray, ...vs: unknown[]): Sanitised,
  and: typeof and,
  assign: typeof assign,
  assignObject: typeof assignObject,
  auto: typeof auto,
  columns: typeof columns,
  delete: typeof delete_,
  distinct: typeof distinct,
  eq: typeof eq,
  exists: typeof exists,
  fallback: typeof fallback,
  falseValue: typeof falseValue,
  gt: typeof gt,
  gte: typeof gte,
  identifier: typeof identifier,
  identifiers: typeof identifiers,
  in: typeof in_,
  inlineTableOfColumn: typeof inlineTableOfColumn,
  inlineTableOfObjects: typeof inlineTableOfObjects,
  insertIgnore: typeof insertIgnore,
  insertNotMatched: typeof insertNotMatched,
  insertObject: typeof insertObject,
  insertObjects: typeof insertObjects,
  is: typeof is,
  json: typeof json,
  jsonQuery: typeof jsonQuery,
  jsonValue: typeof jsonValue,
  like: typeof like,
  limitedHintsIdentifier: typeof limitedHintsIdentifier,
  line: typeof line,
  lines: typeof lines,
  list: typeof list,
  logicalFalse: typeof logicalFalse,
  logicalTrue: typeof logicalTrue,
  lt: typeof lt,
  lte: typeof lte,
  merge1n: typeof merge1n,
  modifyJsons: typeof modifyJsons,
  ne: typeof ne,
  ng: typeof ng,
  nl: typeof nl,
  not: typeof not,
  notDistinct: typeof notDistinct,
  notIn: typeof notIn,
  now: typeof now,
  nstring: typeof nstring,
  null: typeof null_,
  number: typeof number_,
  objectId: typeof objectId,
  or: typeof or,
  randomIdentifier: typeof randomIdentifier,
  raw: typeof raw,
  replaceObjects: typeof replaceObjects,
  row: typeof row,
  rowset: typeof rowset,
  Sanitised: typeof Sanitised,
  SanitisedIdentifier: typeof SanitisedIdentifier,
  select: typeof select,
  star: typeof star,
  TableHintLimited: typeof TableHintLimited,
  template: typeof template,
  top: typeof top,
  trueValue: typeof trueValue,
  unix: typeof unix,
  update: typeof update,

  /** @deprecated @use `update` */
  updateObject: typeof update,

  updateObjects: typeof updateObjects,
  upsertObjects: typeof upsertObjects,
  where: typeof where,

  // Aliases
  id: typeof identifier,
  ids: typeof identifiers
}

const tsql_ =
  (ts: TemplateStringsArray, ...vs: unknown[]): Sanitised =>
    template(ts, ...vs)

const tsql: t =
  Object.assign(tsql_, {
    and,
    assign,
    assignObject,
    auto,
    columns,
    delete: delete_,
    distinct,
    eq,
    exists,
    fallback,
    falseValue,
    gt,
    gte,
    identifier,
    identifiers,
    in: in_,
    inlineTableOfColumn,
    inlineTableOfObjects,
    insertIgnore,
    insertNotMatched,
    insertObject,
    insertObjects,
    is,
    json,
    jsonQuery,
    jsonValue,
    like,
    limitedHintsIdentifier,
    line,
    lines,
    list,
    logicalFalse,
    logicalTrue,
    lt,
    lte,
    merge1n,
    modifyJsons,
    ne,
    ng,
    nl,
    not,
    notDistinct,
    notIn,
    now,
    nstring,
    null: null_,
    number: number_,
    objectId,
    or,
    randomIdentifier,
    raw,
    replaceObjects,
    row,
    rowset,
    Sanitised,
    SanitisedIdentifier,
    select,
    star,
    TableHintLimited,
    template,
    top,
    trueValue,
    unix,
    update,

    /** @deprecated @use `update` */
    updateObject: update,

    updateObjects,
    upsertObjects,
    where,

    // Aliases
    id: identifier,
    ids: identifiers
  })

export default tsql
