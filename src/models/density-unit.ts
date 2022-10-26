import Realm from 'realm'

export type DensityUnitSymbol = DensityUnit['symbol']

export class DensityUnit extends Realm.Object<DensityUnit> {
  public symbol!: 'kg/m³' | 'kg/cm³' | 'kg/mm³' | 'kg/l'

  public description!: string

  public selected!: boolean

  public visible!: boolean

  public static schema: Realm.ObjectSchema = {
    name: 'DensityUnit',
    properties: {
      symbol: 'string',
      selected: 'bool',
      visible: 'bool',
      description: 'string'
    },
    primaryKey: 'symbol'
  }
}
