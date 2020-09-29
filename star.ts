import id from './identifier'
import type S from './sanitised'
import type Sid from './sanitised-identifier'
import tsql from './template'

export const star =
  (table?: Sid | string): S =>
    table ?
      tsql`${id(table)}.*` :
      tsql`*`

export default star
