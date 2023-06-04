import auto from './auto.js'
import raw from './raw.js'
import type S from './sanitised.js'

/** @returns lines joined with provided separator or undefined if there are no lines. */
export const maybeLines =
  <T>(inputs: readonly T[], separator = '\n'): undefined | S => {
    const outputs =
      inputs
        .filter(_ => typeof _ !== 'undefined')
        .map(_ => auto(_))
        .filter(_ => typeof _ !== 'undefined')
        .map(_ => _.toString().trim())
    if (outputs.length === 0) {
      return
    }
    return raw(outputs.join(separator))
  }

export default maybeLines
