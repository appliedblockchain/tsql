import { inspect } from 'util'
import id from './identifier'
import maybeWith from './maybe-with'
import inlineTable from './inline-table-of-column'
import row from './row'
import tsql from './template'
import type S from './sanitised'
import type Sid from './sanitised-identifier'

export const merge1n =
  (table: Sid | string, [ lcolumn, rcolumn ]: [ Sid | string, Sid | string ], lid: unknown, values: unknown[], hints?: string[]): S => {
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
      merge ${maybeWith(table_, hints)} as ${id('Target')}
      using ${inlineTable('Source', 'id', values)}
      on (
        ${id([ 'Target', lcolumn ])} = ${lid} and
        ${id([ 'Target', rcolumn ])} = ${id([ 'Source', 'id' ])}
      )
      when not matched by target then
        insert ${row([ lcolumn_, rcolumn_ ])}
        values ${row([ lid, id('Source.id') ])}
      when not matched by source and ${id([ 'Target', lcolumn ])} = ${lid} then
        delete;
    `
  }

export default merge1n
