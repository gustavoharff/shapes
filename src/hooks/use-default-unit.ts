import type { Unit } from '@/models'

import { useRealm } from './use-realm'

export function useDefaultUnit() {
  const realm = useRealm()

  return realm.objects<Unit>('Unit').filtered('selected == true')[0].symbol
}
