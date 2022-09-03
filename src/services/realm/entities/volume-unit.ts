import Realm from 'realm'

import { VolumeUnit as VolumeUnitType } from '../../../types/unit'

export class VolumeUnit extends Realm.Object<VolumeUnit> {
  public name!: VolumeUnitType

  public description!: string

  public selected!: boolean

  public static schema: Realm.ObjectSchema = {
    name: 'VolumeUnit',
    properties: { name: 'string', selected: 'bool', description: 'string' },
    primaryKey: 'name'
  }
}
