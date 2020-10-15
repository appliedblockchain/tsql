import { inspect } from 'util'
import id from './identifier'
import inlineTable from './inline-table-of-column'
import row from './row'
import S from './sanitised'
import Sid from './sanitised-identifier'
import tsql from './template'

export const merge1n =
  (table: Sid | string, [ lcolumn, rcolumn ]: [ Sid | string, Sid | string ], lid: unknown, values: unknown[]): S => {
    const table_ = id(table)
    const lcolumn_ = id(lcolumn)
    const rcolumn_ = id(rcolumn)
    if (!Array.isArray(values)) {
      throw new TypeError(`Expected array of values, got ${inspect(values)}.`)
    }
    if (!values.length) {
      return tsql`delete from ${table_} where ${lcolumn_} = ${lid};`
    }
    return tsql`
      merge ${table_} with (holdlock) as Target
      using ${inlineTable('Source', 'id', values)}
      on (
        Target.${lcolumn_} = ${lid} and
        Target.${rcolumn_} = Source.id
      )
      when not matched by target then
        insert ${row([ lcolumn_, rcolumn_ ])}
        values ${row([ lid, id('Source.id') ])}
      when not matched by source and Target.${lcolumn_} = ${lid} then
        delete;
    `
  }

export default merge1n
