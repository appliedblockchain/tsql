import maybeLines from './maybe-lines.js'
import type S from './sanitised.js'

/**
 * @returns lines joined with provided separator.
 * @throws if there are no lines on output.
 */
export const lines =
  <T>(inputs: readonly T[], separator = '\n'): S => {
    const output = maybeLines(inputs, separator)
    if (typeof output === 'undefined') {
      throw new Error('Expected at least one line.')
    }
    return output
  }

export default lines
