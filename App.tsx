import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer
} from '@react-navigation/native'
import * as React from 'react'
import { IntlProvider } from 'react-intl'
import { LogBox, Platform, UIManager, useColorScheme, View } from 'react-native'
import RNBootSplash from 'react-native-bootsplash'

import { RealmProvider } from './src/contexts'
import { RootStack } from './src/navigation/root.stack'

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
    <RealmProvider onRealmInit={() => RNBootSplash.hide()}>
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
