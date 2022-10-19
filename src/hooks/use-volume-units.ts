import { useEffect, useState } from 'react'

import { VolumeUnit } from '../services/realm'
import { useRealm } from './use-realm'

export function useVolumeUnits() {
  const [volumeUnits, setVolumeUnits] = useState<VolumeUnit[]>([])

  const realm = useRealm()

  useEffect(() => {
    const volumeUnits = realm.objects<VolumeUnit>('VolumeUnit')

    volumeUnits.addListener(response => {
      // @ts-expect-error `toJSON` dont support generic
      setVolumeUnits(response.toJSON())
    })

    return () => {
      volumeUnits.removeAllListeners()
    }
  }, [realm])

  return volumeUnits
}
