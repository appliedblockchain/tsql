import id from './identifier'
import S from './sanitised'
import Sid from './sanitised-identifier'
import tsql from './template'

export const star =
  (table?: Sid | string): S =>
    table ?
      tsql`${id(table)}.*` :
      tsql`*`

export default star
