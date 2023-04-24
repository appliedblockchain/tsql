import auto from './auto.js'
import jsonPath from './json-path.js'
import tsql from './template.js'
import type S from './sanitised.js'

export const jsonModify =
  (target: S, kvs: Record<string, unknown>): S => {
    const paths = Object.keys(kvs)
    return paths.reduce((result, path) => tsql`
      json_modify(
        ${result},
        ${jsonPath(path)},
        ${auto(kvs[path])}
      )
    `, target)
  }

export default jsonModify
