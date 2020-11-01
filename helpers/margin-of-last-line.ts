import marginOfFirstLine from './margin-of-first-line'

const marginOfLastLine =
  (linesString: string): string =>
    marginOfFirstLine(linesString.substr(1 + linesString.lastIndexOf('\n')))

export default marginOfLastLine
