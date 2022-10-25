import Realm from 'realm'

export class VolumeUnit extends Realm.Object<VolumeUnit> {
  public name!: 'l' | 'cm³' | 'm³' | 'mm³'

  public description!: string

  public visible!: boolean

  public static schema: Realm.ObjectSchema = {
    name: 'VolumeUnit',
    properties: { name: 'string', visible: 'bool', description: 'string' },
    primaryKey: 'name'
  }
}
