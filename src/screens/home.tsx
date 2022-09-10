import { useTheme } from '@react-navigation/native'
import * as React from 'react'
import { Platform, useColorScheme } from 'react-native'

import { useDebounce } from '../hooks'
import { RootStackScreenProps } from '../navigation/types'
import { FiguresList, HeaderIconButton } from '../ui'

export function Home({ navigation }: RootStackScreenProps<'Home'>) {
  const [filter, setFilter] = React.useState('')
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
      )
    })

    if (Platform.OS === 'android') return
    navigation.setOptions({
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

  return <FiguresList filter={debouncedFilter} />
}
