import S from './sanitised.js'

const tag = Symbol()

export class SanitisedIdentifier extends S {
  // @ts-expect-error This tag ensures the class is not forgeable
  private readonly [tag]: 'SanitisedIdentifier'
}

export default SanitisedIdentifier
