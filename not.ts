import tsql from './template'
import type S from './sanitised'

export const not =
  (rhs: undefined | S): undefined | S =>
    typeof rhs === 'undefined' ?
      undefined :
      tsql`not (${rhs})`

export default not
