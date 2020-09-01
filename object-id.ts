import S from './sanitised'
import tsql from './template'

export const objectId =
  (name: string): S =>
    tsql`object_id(${name})`

export default objectId
