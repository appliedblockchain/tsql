import id from './identifier'
import list from './list'
import fallback from './fallback'
import S from './sanitised'

export const columns =
  (all: { [column: string]: S | true }, filter: { [column: string]: boolean } = {}): S => {
    const xs: (S | string)[] = []
    for (const k of Object.keys(all)) {
      if (filter[k] !== false) {
        xs.push(all[k] === true ? k : (all[k] as S))
      }
    }
    return list(xs.map(_ => fallback(_, id)))
  }

export default columns
