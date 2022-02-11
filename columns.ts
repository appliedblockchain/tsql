import id from './identifier'
import list from './list'
import fallback from './fallback'
import type S from './sanitised'

/**
 * @returns column projection based on provided record and optional filter.
 */
export const columns =
  (all: Record<string, boolean | string | S>, filter: Record<string, boolean> = {}): S => {
    const xs: (string | S)[] = []
    for (const k of Object.keys(all)) {
      if (filter[k] !== false) {
        xs.push(all[k] === true ? k : all[k] as string | S)
      }
    }
    return list(xs.map(_ => fallback(_, id)))
  }

export default columns
