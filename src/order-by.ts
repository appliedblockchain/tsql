import id, { type Identifier } from './identifier.js'
import list from './list.js'
import raw from './raw.js'

const orderBy =
  (terms: [identifier: undefined | Identifier, direction: 'asc' | 'desc'][]) =>
    list(terms.map(_ => _ && _[0] ? raw(`${id(_[0])} ${_[1]}`) : undefined))

export default orderBy
