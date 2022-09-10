import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer
} from '@react-navigation/native'
import * as React from 'react'
import { LogBox, Platform, UIManager, useColorScheme } from 'react-native'

import { RealmProvider } from './src/contexts'
import { RootStack } from './src/navigation/root.stack'

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state'
])

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true)
}

export default function App() {
  const isDark = useColorScheme() === 'dark'

  return (
    <RealmProvider>
      <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
        <RootStack />
      </NavigationContainer>
    </RealmProvider>
  )
}
