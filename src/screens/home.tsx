import { useHeaderHeight } from '@react-navigation/elements'
import { useTheme } from '@react-navigation/native'
import * as React from 'react'
import { Platform, StyleSheet, Text, useColorScheme } from 'react-native'
import { getVersion } from 'react-native-device-info'

import { useDebounce } from '../hooks'
import { RootStackScreenProps } from '../navigation/types'
import { FiguresList, HeaderIconButton } from '../ui'

export function Home({ navigation }: RootStackScreenProps<'Home'>) {
  const [filter, setFilter] = React.useState('')
  const headerHeight = useHeaderHeight()
  const isDark = useColorScheme() === 'dark'

  const theme = useTheme()

  const debouncedFilter = useDebounce(filter, 200)

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderIconButton
          name="cog-outline"
          onPress={() => navigation.navigate('Settings')}
        />
      ),
      headerSearchBarOptions: {
        onChangeText: event => setFilter(event.nativeEvent.text),
        onCancelButtonPress: () => setFilter(''),
        headerIconColor: isDark ? '#fff' : '#000',
        hintTextColor: isDark ? '#fff' : '#000',
        textColor: isDark ? '#fff' : '#000',
        tintColor: theme.colors.primary,
        placeholder: 'Buscar',
        obscureBackground: false,
        shouldShowHintSearchIcon: false,
        cancelButtonText: 'Cancelar'
      }
    })
  }, [isDark, navigation, theme.colors.primary])

  return (
    <React.Fragment>
      <FiguresList
        filter={debouncedFilter}
        footer={
          <Text style={[styles.version, { color: theme.colors.text }]}>
            {getVersion()}
          </Text>
        }
        style={{ marginTop: Platform.OS === 'android' ? headerHeight : 0 }}
      />
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  version: {
    textAlign: 'center',
    paddingVertical: 8
  }
})
