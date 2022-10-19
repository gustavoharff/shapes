import { useTheme } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as React from 'react'

import {
  ConeFormScreen,
  ConeTrunkFormScreen,
  CubeFormScreen,
  CylinderFormScreen,
  DisplayPreferencesScreen,
  HomeScreen,
  ParallelepipedFormScreen,
  PyramidFormScreen,
  SelectDensityUnit,
  SelectionPreferencesScreen,
  SelectUnit,
  SettingsScreen
} from '../screens'
import { RootStackParamList } from './types'

const Stack = createNativeStackNavigator<RootStackParamList>()

export function RootStack() {
  const theme = useTheme()

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerBackTitle: 'Voltar',
        headerBlurEffect: theme.dark ? 'dark' : 'light',
        headerTransparent: true,
        headerLargeStyle: {
          backgroundColor: theme.colors.background
        }
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Figuras',
          headerLargeTitle: true
        }}
      />

      <Stack.Screen
        name="CubeForm"
        component={CubeFormScreen}
        options={{
          title: 'Cubo'
        }}
      />

      <Stack.Screen
        name="ConeForm"
        component={ConeFormScreen}
        options={{
          title: 'Cone'
        }}
      />

      <Stack.Screen
        name="ConeTrunkForm"
        component={ConeTrunkFormScreen}
        options={{
          title: 'Tronco do cone'
        }}
      />

      <Stack.Screen
        name="ParallelepipedForm"
        component={ParallelepipedFormScreen}
        options={{
          title: 'Paralelepípedo'
        }}
      />

      <Stack.Screen
        name="CylinderForm"
        component={CylinderFormScreen}
        options={{
          title: 'Cilindro'
        }}
      />

      <Stack.Screen
        name="PyramidForm"
        component={PyramidFormScreen}
        options={{
          title: 'Pirâmide'
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

      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Configurações'
        }}
      />

      <Stack.Screen
        name="DisplayPreferences"
        component={DisplayPreferencesScreen}
        options={{
          title: 'Preferências de exibição'
        }}
      />

      <Stack.Screen
        name="SelectionPreferences"
        component={SelectionPreferencesScreen}
        options={{
          title: 'Preferências de seleção'
        }}
      />
    </Stack.Navigator>
  )
}
