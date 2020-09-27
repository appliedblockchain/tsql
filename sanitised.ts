declare const tag: unique symbol

export class Sanitised extends String {
  readonly [tag]: 'Sanitised'
}

export default Sanitised
