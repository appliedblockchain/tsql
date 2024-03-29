/** @returns string with all lines but the first one indented with `margin`. */
const indentTail =
  (linesString: string, margin: string): string =>
    margin ?
      linesString
        .split('\n')
        .join(`\n${margin}`) :
      linesString

export default indentTail
