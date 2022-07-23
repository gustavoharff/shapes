import { NavigationContainer } from '@react-navigation/native'
import * as React from 'react'

import { HomeStack } from './src/navigation/home.stack'

export default function App() {
  return (
    <NavigationContainer>
      <HomeStack />
    </NavigationContainer>
  )
}
