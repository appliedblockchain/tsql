import identifier from './identifier.js'
import type Sid from './sanitised-identifier.js'

const alphabet = 'abcdefghijklmnopqrstuvwxyABCDEFGHIJKLMNOPQRSTUVWXYZ'

const randomLetter =
  (): string => {
    while (true) {
      const index = Math.min(alphabet.length - 1, Math.floor(Math.random() * alphabet.length))
      return alphabet[index]
    }
  }

const randomIdentifier =
  (prefix = '', length = 32): Sid =>
    identifier([ prefix, Array.from(Array(length), () => randomLetter()).join('') ].join(''))

export default randomIdentifier
