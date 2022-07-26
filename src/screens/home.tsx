import * as React from 'react'
import { View } from 'react-native'

import { RootStackScreenProps } from '../navigation/types'
import { FiguresList } from '../ui'

export function Home(props: RootStackScreenProps<'Home'>) {
  return (
    <View>
      <FiguresList />
    </View>
  )
}
