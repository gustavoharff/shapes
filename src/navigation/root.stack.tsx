import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as React from 'react'

import { Home, CubeForm } from '../screens'

const Stack = createNativeStackNavigator()

export function RootStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitle: 'Voltar'
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Figuras geométricas'
        }}
      />

      <Stack.Screen
        name="CubeForm"
        component={CubeForm}
        options={{
          title: 'Cubo'
        }}
      />
    </Stack.Navigator>
  )
}
