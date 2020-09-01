import fallback from './fallback'
import id from './identifier'
import raw from './raw'
import S from './sanitised'
import tsql from './template'

// TODO: `raw` can leak unsanitised string if misused.
export const op =
  (l: S | string, op_: S | string, r: unknown): S =>
    tsql`${fallback(l, id)} ${fallback(op_, raw)} ${r}`

export default op
