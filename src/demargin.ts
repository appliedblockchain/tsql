import isString from './is-string.js'

/** @internal */
export const demargin =
  (value: string): string => {
    if (!isString(value)) {
      throw new TypeError(`Expected value to be string, got ${value}.`)
    }
    const lines = value.split('\n')
    if ((lines.length > 0) && lines[0].split('').every(_ => _ === ' ')) {
      lines.shift()
    }
    if ((lines.length > 0) && lines[lines.length - 1].split('').every(_ => _ === ' ')) {
      lines.pop()
    }
    let margin = Infinity
    for (const line of lines) {
      for (let i = 0; i < line.length; i++) {
        if (line[i] !== ' ') {
          margin = Math.min(margin, i)
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
