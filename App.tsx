import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
  Theme
} from '@react-navigation/native'
import * as React from 'react'
import { useColorScheme } from 'react-native'

import { RootStack } from './src/navigation/root.stack'

const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#424cd6'
  }
} as Theme

const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#424cd6'
  }
} as Theme

export default function App() {
  const isDark = useColorScheme() === 'dark'

  return (
    <NavigationContainer theme={isDark ? darkTheme : lightTheme}>
      <RootStack />
    </NavigationContainer>
  )
}
