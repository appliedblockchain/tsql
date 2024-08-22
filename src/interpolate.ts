import type S from './sanitised.js'
import indentTail from './indent-tail.js'

type Margin = {
  column: number,
  open: boolean
}

function updateMargin(mutableMargin: Margin, value: string) {

  // Locate start of last line.
  const start = value.lastIndexOf('\n') + 1

  // New value has multiple lines.
  const multiline = start > 0

  // Span of margin on the last line.
  let end = start
  while (end < value.length && value[end] === ' ') {
    end++
  }

  // Margin's column.
  const column = end - start

  // Last line is full of blanks.
  const blanks = end === value.length

  // Update margin.
  mutableMargin.column = multiline ? column : mutableMargin.column + (mutableMargin.open ? column : 0)
  mutableMargin.open = (mutableMargin.open || multiline) && blanks
}

/**
 * @returns interpolated array `xs` with values from `ys`; empty array if both arrays are empty.
 * @throws if `xs.length - 1 !== ys.length`
 */
export const interpolate =
  (xs: TemplateStringsArray, ys: S[]): string[] => {
    if (!Array.isArray(xs) || !Array.isArray(ys)) {
      throw new TypeError(`Expected xs and ys to be an array, got ${xs} and ${ys}.`)
    }
    if ((xs.length === 0) && (ys.length === 0)) {
      return []
    }
    if (xs.length - 1 !== ys.length) {
      throw new TypeError(`Expected xs and ys length to be correct, got ${xs.length} and ${ys.length}.`)
    }
    const margin = { column: 0, open: true }
    const rs: string[] = []
    const push =
      (value: string) => {
        rs.push(value)
        updateMargin(margin, value)
      }
    push(xs[0])
    for (let i = 0; i < ys.length; i++) {
      push(indentTail(ys[i].toString(), ' '.repeat(margin.column)))
      push(xs[i + 1])
    }
    return rs
  }

export default interpolate
