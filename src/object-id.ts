import type S from './sanitised.js'
import tsql from './template.js'

export const objectId =
  (name: string): S =>
    tsql`object_id(${name})`

export default objectId
