/** @returns whitespace margin (spaces/tabs) for single/first line. */
const marginOfFirstLine =
  (line: string): string => {
    let i = 0
    for (; i < line.length; i++) {
      if (line[i] !== ' ' && line[i] !== '\t') {
        break
      }
    }
    return line.slice(0, i)
  }

export default marginOfFirstLine
