// // @flow
//
// const auto = require('./auto')
// const raw = require('./raw')
//
// /*:: import S from './sanitised' */
//
// /** @returns a line constructed from components; undefined values are filtered out. */
// const lines /*: (...S[]) => S */ =
//   (...xs) => {
//     const xs_ = xs.filter(Boolean)
//     for (const x of xs_) {
//       if (!(x instanceof S)) {
//         throw new TypeError(`Expected sanitised line, got ${inspect(x)} in ${inspect(xs)} lines.`)
//       }
//     }
//     return xs_.map(_ => _.toString().trim()).join('\n')
//   }
//
// module.exports = lines
