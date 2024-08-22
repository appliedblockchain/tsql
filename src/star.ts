import id from './identifier.js'
import type S from './sanitised.js'
import type Sid from './sanitised-identifier.js'
import tsql from './template.js'

export const star =
  (table?: Sid | string): S =>
    table != null ?
      tsql`${id(table)}.*` :
      tsql`*`

export default star
