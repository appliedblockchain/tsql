import id from './identifier'
import tsql from './template'
import type S from './sanitised'
import type Sid from './sanitised-identifier'

/** @returns assigment, ie. in `update T set (l = r)`. */
export const assign =
  (lhs: Sid | string, rhs: unknown): undefined | S =>
    typeof rhs === 'undefined' ?
      undefined :
      tsql`${id(lhs)} = ${rhs}`

export default assign
