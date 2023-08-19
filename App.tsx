import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer
} from '@react-navigation/native'
import * as React from 'react'
import { IntlProvider } from 'react-intl'
import { LogBox, Platform, UIManager, useColorScheme, View } from 'react-native'
import * as SplashScreen from 'expo-splash-screen'

import { RealmProvider } from '@/contexts'
import { RootStack } from '@/navigation'

SplashScreen.preventAutoHideAsync()

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state'
])

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true)
}

export default function App() {
  const isDark = useColorScheme() === 'dark'

  return (
    <RealmProvider onRealmInit={() => SplashScreen.hideAsync()}>
      <IntlProvider locale="pt-BR">
        <View
          style={{
            flex: 1,
            backgroundColor: isDark
              ? DarkTheme.colors.background
              : DefaultTheme.colors.background
          }}
        >
          <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
            <RootStack />
          </NavigationContainer>
        </View>
      </IntlProvider>
    </RealmProvider>
  )
}
