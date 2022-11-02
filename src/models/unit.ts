import Realm from 'realm'

export type UnitSymbol = Unit['symbol']

type RequiredFields = 'symbol' | 'selected' | 'visible'

export class Unit extends Realm.Object<Unit, RequiredFields> {
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
