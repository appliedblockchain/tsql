import { inspect } from 'util'
import type S from '../sanitised'
import marginOfLastLine from './margin-of-last-line'
import indentTail from './indent-tail'

/**
 * @returns interpolated array `xs` with values from `ys`; empty array if both arrays are empty.
 * @throws if `xs.length - 1 !== ys.length`
 */
export const interpolate =
  (xs: TemplateStringsArray, ys: S[]): string[] => {
    if (!Array.isArray(xs) || !Array.isArray(ys)) {
      throw new TypeError(`Expected xs and ys to be an array, got ${inspect(xs)} and ${inspect(ys)}.`)
    }
    if (!xs.length && !ys.length) {
      return []
    }
    if (xs.length - 1 !== ys.length) {
      throw new TypeError(`Expected xs and ys length to be correct, got ${inspect(xs.length)} and ${inspect(ys.length)}.`)
    }
    const rs: string[] = [ xs[0] ]
    for (let i = 0; i < ys.length; i++) {
      const margin = marginOfLastLine(rs[rs.length - 1])
      rs.push(indentTail(ys[i].toString(), margin))
      rs.push(xs[i + 1])
    }
    return rs
  }

export default interpolate
