import { Unit } from '../services/realm'
import { useRealm } from './use-realm'

export function useDefaultUnit(): Unit['name'] {
  const realm = useRealm()

  return realm.objects<Unit>('Unit').filtered('selected == true')[0].name
}
