import id from './identifier'
import nstring from './nstring'
import Sid from './sanitised-identifier'

const jsonQuery =
  (column: Sid | string, query: string): Sid =>
    new Sid(`json_query(${id(column).toString()}, ${nstring(query).toString()})`)

export default jsonQuery
