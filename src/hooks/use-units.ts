import type { Unit } from '@/models'

import { useEffect, useState } from 'react'

import { useRealm } from './use-realm'

export function useUnits() {
  const [units, setUnits] = useState<Unit[]>([])

  const realm = useRealm()

  useEffect(() => {
    const units = realm.objects<Unit>('Unit')

    units.addListener(response => {
      // @ts-expect-error `toJSON` dont support generic
      setUnits(response.toJSON())
    })

    return () => {
      units.removeAllListeners()
    }
  }, [realm])

  return units
}
