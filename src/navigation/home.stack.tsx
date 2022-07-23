import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as React from 'react'

import { Home } from '../screens'

const Stack = createNativeStackNavigator()

export function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Figuras geométricas'
        }}
      />
    </Stack.Navigator>
  )
}
