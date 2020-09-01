import S from './sanitised'

/** @returns force `x` string to be sanitised; no sanitation of any kind is performed. */
export const raw =
  (x: string): S =>
    new S(x)

export default raw
