import fallback from './fallback.js'
import id from './identifier.js'
import line from './line.js'
import list from './list.js'
import S from './sanitised.js'
import type Sid from './sanitised-identifier.js'
import tsql from './template.js'

export const ids =
  (xs: (S | string)[]): S[] =>
    xs.map(_ => _ instanceof S ? _ : id(_))

export const select =
  (what: S | (S | string)[], { from, where }: { from?: Sid | string, where?: unknown } = {}): S => {
    const what_ = fallback(what, _ => list(ids(_)))
    if (typeof what_ === 'undefined') {
      throw new Error('Empty projection.')
    }
    const from_ = from != null ? id(from) : undefined
    return line(
      tsql`select ${what_}`,
      tsql`from ${from_}`,
      where != null ? tsql`where ${where}` : undefined
    )
  }

export default select
