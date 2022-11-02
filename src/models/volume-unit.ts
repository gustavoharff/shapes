import Realm from 'realm'

export type VolumeUnitSymbol = VolumeUnit['symbol']

export class VolumeUnit extends Realm.Object<VolumeUnit> {
  public symbol!: 'l' | 'cm³' | 'm³' | 'mm³'

  public visible!: boolean

  public static schema: Realm.ObjectSchema = {
    name: 'VolumeUnit',
    properties: { symbol: 'string', visible: 'bool' },
    primaryKey: 'symbol'
  }
}
