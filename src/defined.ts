/** @returns object without undefined values. */
const defined =
  (object: Record<string, unknown>): Record<string, unknown> => {
    const object_ = Object.assign({}, object)
    for (const key in object) {
      if (typeof object_[key] === 'undefined') {

        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete object_[key]
      }
    }
    return object_
  }

export default defined
