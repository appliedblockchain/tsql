import tsql from './template'

const unix =
  tsql`datediff(s, '1970-01-01 00:00:00', getutcdate())`

export default unix
