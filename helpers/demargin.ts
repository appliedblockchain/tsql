import { inspect } from 'util'
import isString from './is-string'

export const demargin =
  (value: string): string => {
    if (!isString(value)) {
      throw new TypeError(`Expected value to be string, got ${inspect(value)}.`)
    }
    const lines = value.split('\n')
    if (lines.length && lines[0].split('').every(_ => _ === ' ')) {
      lines.shift()
    }
    if (lines.length && lines[lines.length - 1].split('').every(_ => _ === ' ')) {
      lines.pop()
    }
    let margin = Infinity
    for (let i = 0; i < lines.length; i++) {
      for (let j = 0; j < lines[i].length; j++) {
        if (lines[i][j] !== ' ') {
          margin = Math.min(margin, j)
          break
        }
      }
    }
    if (margin === Infinity) {
      return lines.join('\n')
    }
    return lines
      .map(_ => _.slice(margin))
      .join('\n')
  }

export default demargin
