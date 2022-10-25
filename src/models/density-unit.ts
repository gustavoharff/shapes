import Realm from 'realm'

export class DensityUnit extends Realm.Object<DensityUnit> {
  public name!: 'kg/m³' | 'kg/cm³' | 'kg/mm³' | 'kg/l'

  public description!: string

  public selected!: boolean

  public visible!: boolean

  public static schema: Realm.ObjectSchema = {
    name: 'DensityUnit',
    properties: {
      name: 'string',
      selected: 'bool',
      visible: 'bool',
      description: 'string'
    },
    primaryKey: 'name'
  }
}
