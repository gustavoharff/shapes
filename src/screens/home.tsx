import * as React from 'react'

import { RootStackScreenProps } from '../navigation/types'
import { FiguresList } from '../ui'

export function Home(props: RootStackScreenProps<'Home'>) {
  return <FiguresList />
}
