import Realm from 'realm'

export type DensityUnitSymbol = DensityUnit['symbol']

type RequiredFields = 'symbol' | 'selected' | 'visible'

export class DensityUnit extends Realm.Object<DensityUnit, RequiredFields> {
  public symbol!: 'kg/m³' | 'kg/cm³' | 'kg/mm³' | 'kg/l'

  public selected!: boolean

  public visible!: boolean

  public static schema: Realm.ObjectSchema = {
    name: 'DensityUnit',
    properties: {
      symbol: 'string',
      selected: 'bool',
      visible: 'bool'
    },
    primaryKey: 'symbol'
  }
}
