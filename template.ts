import auto from './auto'
import demargin from './helpers/demargin'
import interpolate from './helpers/interpolate'
import raw from './raw'
import S from './sanitised'

export const template =
  (ts: TemplateStringsArray, ...vs: unknown[]): S =>
    raw(demargin(interpolate(ts, vs.map(auto)).join('')))

export default template
