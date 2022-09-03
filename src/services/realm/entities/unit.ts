import Realm from 'realm'

import { Unit as UnitType } from '../../../types/unit'

export class Unit extends Realm.Object<Unit> {
  public name!: UnitType

  public description!: string

  public selected!: boolean

  public static schema: Realm.ObjectSchema = {
    name: 'Unit',
    properties: { name: 'string', selected: 'bool', description: 'string' },
    primaryKey: 'name'
  }
}
