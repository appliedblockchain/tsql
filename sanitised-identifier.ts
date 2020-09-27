import S from './sanitised'

declare const tag: unique symbol

export class SanitisedIdentifier extends S {
  readonly [tag]: 'SanitisedIdentifier'
}

export default SanitisedIdentifier
