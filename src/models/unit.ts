import Realm from 'realm'

export class Unit extends Realm.Object<Unit> {
  public name!: 'm' | 'cm' | 'mm'

  public description!: string

  public selected!: boolean

  public visible!: boolean

  public static schema: Realm.ObjectSchema = {
    name: 'Unit',
    properties: {
      name: 'string',
      selected: 'bool',
      visible: 'bool',
      description: 'string'
    },
    primaryKey: 'name'
  }
}
