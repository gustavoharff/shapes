import { useTheme } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as React from 'react'

import { Home, CubeForm } from '../screens'

const Stack = createNativeStackNavigator()

export function RootStack() {
  const theme = useTheme()

  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitle: 'Voltar',
        headerLargeTitle: true,
        headerBlurEffect: theme.dark ? 'dark' : 'light',
        headerTransparent: true,
        headerLargeStyle: {
          backgroundColor: theme.colors.background
        }
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Figuras'
        }}
      />

      <Stack.Screen
        name="CubeForm"
        component={CubeForm}
        options={{
          title: 'Cubo',
          headerLargeTitle: false
        }}
      />
    </Stack.Navigator>
  )
}
