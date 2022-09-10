import { DensityUnit } from '../services/realm'
import { useRealm } from './use-realm'

export function useDefaultDensityUnit(): DensityUnit['name'] {
  const realm = useRealm()

  return realm
    .objects<DensityUnit>('DensityUnit')
    .filtered('selected == true')[0].name
}
