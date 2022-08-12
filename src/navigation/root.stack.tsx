import { useTheme } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as React from 'react'

import {
  Home,
  ConeFormScreen,
  CubeFormScreen,
  SelectUnit,
  SelectDensityUnit,
  ParallelepipedFormScreen,
  CylinderFormScreen
} from '../screens'

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
        component={CubeFormScreen}
        options={{
          title: 'Cubo',
          headerLargeTitle: false
        }}
      />

      <Stack.Screen
        name="ConeForm"
        component={ConeFormScreen}
        options={{
          title: 'Cone',
          headerLargeTitle: false
        }}
      />

      <Stack.Screen
        name="ParallelepipedForm"
        component={ParallelepipedFormScreen}
        options={{
          title: 'Paralelepípedo',
          headerLargeTitle: false
        }}
      />

      <Stack.Screen
        name="CylinderForm"
        component={CylinderFormScreen}
        options={{
          title: 'Cilindro',
          headerLargeTitle: false
        }}
      />

      <Stack.Group
        screenOptions={{
          headerLargeStyle: {},
          headerLargeTitle: false,
          presentation: 'modal',
          title: 'Unidades',
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: theme.dark
              ? 'rgb(28, 28, 30)'
              : 'rgb(242, 242, 247)'
          },
          contentStyle: {
            backgroundColor: theme.dark
              ? 'rgb(28, 28, 30)'
              : 'rgb(242, 242, 247)'
          },
          headerTransparent: false
        }}
      >
        <Stack.Screen name="SelectUnit" component={SelectUnit} />
        <Stack.Screen name="SelectDensityUnit" component={SelectDensityUnit} />
      </Stack.Group>
    </Stack.Navigator>
  )
}
