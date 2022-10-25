import type Realm from 'realm'

import { useContext } from 'react'

import { RealmContext } from 'contexts'

export function useRealm(): Realm {
  const context = useContext(RealmContext)

  if (context == null) {
    throw new Error(
      'Realm context not found.  Did you call useRealm() within a <RealmProvider/>?'
    )
  }

  return context.realm
}
