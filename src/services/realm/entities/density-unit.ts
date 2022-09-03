import Realm from 'realm'

import { DensityUnit as DensityUnitType } from '../../../types/unit'

export class DensityUnit extends Realm.Object<DensityUnit> {
  public name!: DensityUnitType

  public description!: string

  public selected!: boolean

  public static schema: Realm.ObjectSchema = {
    name: 'DensityUnit',
    properties: { name: 'string', selected: 'bool', description: 'string' },
    primaryKey: 'name'
  }
}
