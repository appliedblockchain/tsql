import id from './identifier'
import nstring from './nstring'
import Sid from './sanitised-identifier'

const jsonValue =
  (column: Sid | string, query: string): Sid =>
    new Sid(`json_value(${id(column).toString()}, ${nstring(query).toString()})`)

export default jsonValue
