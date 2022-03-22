import fallback from './fallback.js'
import id from './identifier.js'
import tsql from './template.js'
import type S from './sanitised.js'

export const notBetween =
  <T>(l: string | S, r: undefined | null | [beginExpression: T, endExpression: T]): undefined | S =>
    typeof l === 'undefined' || r == null ?
      undefined :
      tsql`${fallback(l, id)} not between ${r[0]} and ${r[1]}`

export default notBetween
