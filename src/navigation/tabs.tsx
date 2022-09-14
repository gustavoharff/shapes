import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useTheme } from '@react-navigation/native'
import * as React from 'react'

import { NonPolyhedronsScreen, PolyhedraScreen } from '../screens'
import { Cylinder, Pyramid } from '../ui'

const Tab = createBottomTabNavigator()

export function Tabs() {
  const theme = useTheme()

  function getPrimaryTabColor(focused: boolean) {
    if (focused) return undefined

    if (theme.dark) return '#3e3e3e'

    return '#b6b6b6'
  }

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Polyhedra"
        component={PolyhedraScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Poliedros',
          tabBarIcon: ({ size, focused, color }) => (
            <Pyramid
              size={size}
              primaryColor={getPrimaryTabColor(focused)}
              secondaryColor={focused ? undefined : color}
            />
          )
        }}
      />
      <Tab.Screen
        name="NonPolyhedrons"
        component={NonPolyhedronsScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Não Poliedros',
          tabBarIcon: ({ size, focused, color }) => (
            <Cylinder
              size={size}
              primaryColor={getPrimaryTabColor(focused)}
              secondaryColor={focused ? undefined : color}
            />
          )
        }}
      />
    </Tab.Navigator>
  )
}
