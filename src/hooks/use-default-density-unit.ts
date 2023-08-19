import type { DensityUnit } from '@/models'

import { useRealm } from './use-realm'

export function useDefaultDensityUnit() {
  const realm = useRealm()

  return realm
    .objects<DensityUnit>('DensityUnit')
    .filtered('selected == true')[0].symbol
}
