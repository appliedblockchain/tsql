import tsql from './template.js'
import type S from './sanitised.js'

export const not =
  (rhs: undefined | S): undefined | S =>
    typeof rhs === 'undefined' ?
      undefined :
      tsql`not (${rhs})`

export default not
