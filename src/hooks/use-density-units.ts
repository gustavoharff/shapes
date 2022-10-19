import { useEffect, useState } from 'react'

import { DensityUnit } from '../services/realm'
import { useRealm } from './use-realm'

export function useDensityUnits() {
  const [densityUnits, setDensityUnits] = useState<DensityUnit[]>([])

  const realm = useRealm()

  useEffect(() => {
    const densityUnits = realm.objects<DensityUnit>('DensityUnit')

    densityUnits.addListener(response => {
      // @ts-expect-error `toJSON` dont support generic
      setDensityUnits(response.toJSON())
    })

    return () => {
      densityUnits.removeAllListeners()
    }
  }, [realm])

  return densityUnits
}
