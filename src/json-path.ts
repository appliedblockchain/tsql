
export const re = /^\s*((append|lax|strict)\s+)*\$\./i

/** @returns `[append] [lax | strict] $.<path>` json path from simplified path. */
export const jsonPath =
  (path: string, { mode, append }: { append?: boolean, mode?: 'lax' | 'strict' } = {}): string => {
    if (re.test(path)) {
      return path
    }
    const parts: string[] = []
    if (append) {
      parts.push('append')
    }
    if (mode) {
      parts.push(mode)
    }
    if (parts.length) {
      return `${parts.join(' ')} $.${path}`
    }
    return `$.${path}`
  }

export default jsonPath
