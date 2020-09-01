import id from './identifier'
import tsql from './template'
import S from './sanitised'
import Sid from './sanitised-identifier'

/** @returns assigment, ie. in `update T set (l = r)`. */
export const assign =
  (l: Sid | string, r: unknown): S =>
    tsql`${id(l)} = ${r}`

export default assign
