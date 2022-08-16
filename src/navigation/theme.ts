import { DarkTheme, DefaultTheme, Theme } from '@react-navigation/native'

import { theme } from '../theme'

export const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: theme.dark.primary
  }
} as Theme

export const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: theme.light.primaryVariant
  }
} as Theme
