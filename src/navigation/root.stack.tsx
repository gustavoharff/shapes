import { useTheme } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as React from 'react'

import { t } from 'i18n'
import {
  ConeFormScreen,
  ConeTrunkFormScreen,
  CubeFormScreen,
  CylinderFormScreen,
  DisplayPreferencesScreen,
  HexagonalPrismFormScreen,
  HomeScreen,
  ParallelepipedFormScreen,
  PyramidFormScreen,
  SelectDensityUnit,
  SelectionPreferencesScreen,
  SelectUnit,
  SettingsScreen
} from 'screens'
import { HeaderTextButton } from 'ui'

import { RootStackParamList } from './types'

const Stack = createNativeStackNavigator<RootStackParamList>()

export function RootStack() {
  const theme = useTheme()

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerBackTitle: t('navigation.back'),
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
          title: t('screens.home.title'),
          headerLargeTitle: true
        }}
      />

      <Stack.Screen
        name="CubeForm"
        component={CubeFormScreen}
        options={{
          title: t('figures.cube')
        }}
      />

      <Stack.Screen
        name="ConeForm"
        component={ConeFormScreen}
        options={{
          title: t('figures.cone')
        }}
      />

      <Stack.Screen
        name="ConeTrunkForm"
        component={ConeTrunkFormScreen}
        options={{
          title: t('figures.cone-trunk')
        }}
      />

      <Stack.Screen
        name="ParallelepipedForm"
        component={ParallelepipedFormScreen}
        options={{
          title: t('figures.parallelepiped')
        }}
      />

      <Stack.Screen
        name="HexagonalPrismForm"
        component={HexagonalPrismFormScreen}
        options={{
          title: t('figures.hexagonal-prism')
        }}
      />

      <Stack.Screen
        name="CylinderForm"
        component={CylinderFormScreen}
        options={{
          title: t('figures.cylinder')
        }}
      />

      <Stack.Screen
        name="PyramidForm"
        component={PyramidFormScreen}
        options={{
          title: t('figures.pyramid')
        }}
      />

      <Stack.Group
        screenOptions={({ navigation }) => ({
          headerLargeStyle: {},
          headerLargeTitle: false,
          presentation: 'modal',
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
          headerTransparent: false,
          headerRight: () => (
            <HeaderTextButton bold onPress={navigation.goBack}>
              OK
            </HeaderTextButton>
          )
        })}
      >
        <Stack.Screen
          name="SelectUnit"
          component={SelectUnit}
          options={{ title: t('units.title') }}
        />
        <Stack.Screen
          name="SelectDensityUnit"
          component={SelectDensityUnit}
          options={{ title: t('density-units.title') }}
        />
      </Stack.Group>

      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: t('screens.settings.title')
        }}
      />

      <Stack.Screen
        name="DisplayPreferences"
        component={DisplayPreferencesScreen}
        options={{
          title: t('screens.display-preferences.title')
        }}
      />

      <Stack.Screen
        name="SelectionPreferences"
        component={SelectionPreferencesScreen}
        options={{
          title: t('screens.selection-preferences.title')
        }}
      />
    </Stack.Navigator>
  )
}
