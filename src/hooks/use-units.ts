import { useEffect, useState } from 'react'

import { Unit } from '../services/realm'
import { useRealm } from './use-realm'

export function useUnits() {
  const [units, setUnits] = useState<Unit[]>([])

  const realm = useRealm()

  useEffect(() => {
    const units = realm.objects<Unit>('Unit')

    units.addListener(response => {
      setUnits(response.toJSON())
    })

    return () => {
      units.removeAllListeners()
    }
  }, [realm])

  return units
}
