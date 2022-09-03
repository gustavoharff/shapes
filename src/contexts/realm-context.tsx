import React, {
  createContext,
  ReactNode,
  useEffect,
  useRef,
  useState
} from 'react'
import Realm from 'realm'

import { DensityUnit, onFirstOpen, Unit, VolumeUnit } from '../services/realm'

interface RealmContextData {
  realm: Realm
}

interface RealmProviderProps {
  children: ReactNode
}

export const RealmContext = createContext<RealmContextData>(
  {} as RealmContextData
)

export function RealmProvider({ children }: RealmProviderProps) {
  const [realm, setRealm] = useState<Realm | null>(null)

  const currentRealm = useRef(realm)

  useEffect(() => {
    currentRealm.current = realm
  }, [realm])

  useEffect(() => {
    const realmRef = currentRealm.current
    const shouldInitRealm = realmRef === null

    async function initRealm() {
      const realmInstance = await Realm.open({
        schema: [DensityUnit, Unit, VolumeUnit],
        schemaVersion: 0,
        onFirstOpen
      })

      console.log(realmInstance.path)

      setRealm(realmInstance)
    }

    if (shouldInitRealm) {
      initRealm().catch(console.error)
    }

    return () => {
      if (realm) {
        realm.close()
        setRealm(null)
      }
    }
  }, [realm])

  if (!realm) {
    return null
  }

  return (
    <RealmContext.Provider value={{ realm }}>{children}</RealmContext.Provider>
  )
}