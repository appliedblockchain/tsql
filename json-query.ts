import id from './identifier'
import nstring from './nstring'
import Sid from './sanitised-identifier'

const jsonQuery =
  (column: Sid | string, query?: undefined | null | string): Sid =>
    query ?
      new Sid(`json_query(${id(column).toString()}, ${nstring(query).toString()})`) :
      new Sid(`json_query(${id(column).toString()})`)

export default jsonQuery
