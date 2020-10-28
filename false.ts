import type S from './sanitised'
import raw from './raw'

export const false_: S =
  raw('1=0')

export default false_
