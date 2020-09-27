import quotedString from './helpers/quoted-string'
import S from './sanitised'

// TODO: Add SanitisedValue type?
export const nstring =
  (value: void | null | string | S): S =>
    value instanceof S ?
      value :
      value == null ?
        new S('null') :
        new S(`N${quotedString(String(value))}`)

export default nstring
