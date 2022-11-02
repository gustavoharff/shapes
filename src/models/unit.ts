import Realm from 'realm'

export type UnitSymbol = Unit['symbol']

export class Unit extends Realm.Object<Unit> {
  public symbol!: 'm' | 'cm' | 'mm'

  public selected!: boolean

  public visible!: boolean

  public static schema: Realm.ObjectSchema = {
    name: 'Unit',
    properties: {
      symbol: 'string',
      selected: 'bool',
      visible: 'bool'
    },
    primaryKey: 'symbol'
  }
}
