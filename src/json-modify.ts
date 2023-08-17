import auto from './auto.js'
import jsonPath from './json-path.js'
import trueValue from './true-value.js'
import tsql from './template.js'
import type S from './sanitised.js'

export const jsonModify =
  (target: S, kvs: Record<string, unknown>): S => {
    const paths = Object.keys(kvs)
    return paths.reduce((result, path) => {
      if (path.startsWith('force ')) {
        const path_ = path.slice('force '.length)
        return tsql`
          json_modify(
            json_modify(
              ${result},
              ${'lax ' + jsonPath(path_)},
              ${trueValue}
            ),
            ${'strict ' + jsonPath(path_)},
            ${auto(kvs[path])}
          )
        `
      }
      return tsql`
        json_modify(
          ${result},
          ${jsonPath(path)},
          ${auto(kvs[path])}
        )
      `
    }, target)
  }

export default jsonModify
