import assign from './assign.js'
import id from './identifier.js'
import jsonPath from './json-path.js'
import list from './list.js'
import tsql from './template.js'
import type S from './sanitised.js'

/**
 * @returns assigment clause based on provided record, ie. for UPDATE SET.
 *
 * `undefined` entries are filtered out.
 *
 * Propagates undefined if there are no non-undefined entries.
 */
export function assignObject(record: Record<string, unknown>): undefined | S {
  const assignments: (undefined | S)[] = []
  const jsonAssignments: Record<string, S> = {}
  for (const [ lvalue, rvalue ] of Object.entries(record)) {
    if (lvalue.indexOf('->') !== -1) {
      const [ llvalue, lrvalue ] = lvalue.split('->')
      jsonAssignments[llvalue] = tsql`
        json_modify(
          ${jsonAssignments[llvalue] ?? id(llvalue)},
          ${jsonPath(lrvalue)},
          ${rvalue}
        )
      `
      continue
    }
    assignments.push(assign(id(lvalue), rvalue))
  }
  for (const [ lvalue, rvalue ] of Object.entries(jsonAssignments)) {
    const a = assign(id(lvalue), tsql`
      (
        ${rvalue}
      )
    `)
    assignments.push(a)
  }
  return list(assignments, undefined, ',\n')
}

export default assignObject
