import id from './identifier.js'
import jsonPath from './json-path.js'
import S from './sanitised.js'
import tsql from './template.js'
import type Sid from './sanitised-identifier.js'

/**
 * @returns assigment operator LHS = RHS.
 *
 * `undefined` RHS is propagated.
 *
 * `null` RHS is left as is LHS = null.
 */
export function assign(lvalue: Sid | string, rvalue: unknown): undefined | S {
  if (typeof rvalue === 'undefined') {
    return undefined
  }
  if (lvalue instanceof S) {
    return tsql`${lvalue} = ${rvalue}`
  }
  if (lvalue.indexOf('->') === -1) {
    return tsql`${id(lvalue)} = ${rvalue}`
  }
  const [ llvalue, lrvalue ] = lvalue.split('->')
  return tsql`${id(llvalue)} = json_modify(${id(llvalue)}, ${jsonPath(lrvalue)}, ${rvalue})`
}

export default assign
