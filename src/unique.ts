import S from './sanitised.js'

/** @returns deduplicated values. */
export function unique(values: S[]): S[] {
  const set = new Set<string>
  const result: S[] = []
  for (const value of values) {
    const stringValue = value.toString()
    if (!set.has(stringValue)) {
      set.add(stringValue)
      result.push(value)
    }
  }
  return result
}

export default unique
