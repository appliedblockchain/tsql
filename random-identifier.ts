import { randomBytes } from 'crypto'
import Sid from './sanitised-identifier'

const alphabet = 'abcdefghijklmnopqrstuvwxyABCDEFGHIJKLMNOPQRSTUVWXYZ'

const randomLetter =
  (): string => {
    while (true) {
      const random = randomBytes(1)[0] >> 2
      if (random < alphabet.length) {
        return alphabet[random]
      }
    }
  }

const randomIdentifier =
  (length = 32): Sid =>
    new Sid(Array.from(Array(length), () => randomLetter()).join(''))

export default randomIdentifier
