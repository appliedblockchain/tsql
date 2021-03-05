import fallback from './fallback'
import id from './identifier'
import isNil from './helpers/is-nil'
import nstring from './nstring'
import tsql from './template'
import type S from './sanitised'

const rhsLike =
  (rhs: unknown): S =>
    isNil(rhs) ?
      tsql`is null` :
      tsql`like ${nstring(String(rhs))}`

export const like =
  (lhs: S | string, rhs: unknown): undefined | S =>
    typeof rhs === 'undefined' ?
      undefined :
      tsql`${fallback(lhs, id)} ${rhsLike(rhs)}`

export default like
