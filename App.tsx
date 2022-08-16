import { NavigationContainer } from '@react-navigation/native'
import * as React from 'react'
import { Platform, UIManager, useColorScheme, LogBox } from 'react-native'

import { RootStack } from './src/navigation/root.stack'
import { darkTheme, lightTheme } from './src/navigation/theme'

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
    <NavigationContainer theme={isDark ? darkTheme : lightTheme}>
      <RootStack />
    </NavigationContainer>
  )
}
