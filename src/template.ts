import auto from './auto.js'
import demargin from './demargin.js'
import interpolate from './helpers/interpolate.js'
import raw from './raw.js'
import type S from './sanitised.js'

export const template =
  (ts: TemplateStringsArray, ...vs: unknown[]): S =>
    raw(demargin(interpolate(ts, vs.map(auto)).join('')))

export default template
