import id from './identifier'
import list from './list'
import fallback from './fallback'
import type S from './sanitised'

/**
 * @returns column projection based on provided record and optional filter.
 *
 * Propagates `undefined` if there are no non-`undefined` entries.
 */
export const columns =
  (record: Record<string, boolean | string | S>, filter: Record<string, boolean> = {}): undefined | S => {
    const values: (string | S)[] = []
    for (const key of Object.keys(record)) {
      if (filter[key] !== false) {
        values.push(record[key] === true ? key : record[key] as string | S)
      }
    }
    return list(values.map(_ => fallback(_, id)))
  }

export default columns
