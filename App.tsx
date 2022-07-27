import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
  Theme
} from '@react-navigation/native'
import * as React from 'react'
import { Platform, UIManager, useColorScheme } from 'react-native'

import { RootStack } from './src/navigation/root.stack'
import { theme } from './src/theme'

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true)
}

const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: theme.dark.primary
  }
} as Theme

const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: theme.light.primaryVariant
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
