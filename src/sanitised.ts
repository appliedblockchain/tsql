const tag = Symbol()

export class Sanitised extends String {
  // @ts-expect-error This tag ensures the class is not forgeable
  private readonly [tag]: 'Sanitised'
}

export default Sanitised
