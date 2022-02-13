import quotedNstring from './quoted-nstring.js'
import S from './sanitised.js'

// TODO: Add SanitisedValue type?
export const nstring =
  (value: undefined | null | string | S): S =>
    value instanceof S ?
      value :
      value == null ?
        new S('null') :
        new S(quotedNstring(String(value)))

export default nstring
