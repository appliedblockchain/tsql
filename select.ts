import fallback from './fallback'
import id from './identifier'
import line from './line'
import list from './list'
import S from './sanitised'
import Sid from './sanitised-identifier'
import tsql from './template'

export const ids =
  (xs: (S | string)[]): S[] =>
    xs.map(_ => _ instanceof S ? _ : id(_))

export const select =
  (what: S | (S | string)[], { from, where }: { from?: Sid | string, where?: unknown } = {}): S => {
    const what_ = fallback(what, _ => list(ids(_)))
    const from_ = from ? id(from) : undefined
    return line(
      tsql`select ${what_}`,
      tsql`from ${from_}`,
      where ? tsql`where ${where}` : undefined
    )
  }

export default select
