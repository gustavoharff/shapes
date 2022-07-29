import { useHeaderHeight } from '@react-navigation/elements'
import * as React from 'react'
import { Platform, useColorScheme } from 'react-native'

import { useDebounce } from '../hooks/use-debounce-effect'
import { RootStackScreenProps } from '../navigation/types'
import { theme } from '../theme'
import { FiguresList } from '../ui'

export function Home({ navigation }: RootStackScreenProps<'Home'>) {
  const [filter, setFilter] = React.useState('')
  const headerHeight = useHeaderHeight()
  const isDark = useColorScheme() === 'dark'

  const debouncedFilter = useDebounce(filter, 200)

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        onChangeText: event => setFilter(event.nativeEvent.text),
        onCancelButtonPress: () => setFilter(''),
        headerIconColor: isDark ? '#fff' : '#000',
        hintTextColor: isDark ? '#fff' : '#000',
        textColor: isDark ? '#fff' : '#000',
        tintColor: theme.dark.primary,
        placeholder: 'Buscar',
        obscureBackground: false,
        shouldShowHintSearchIcon: false,
        cancelButtonText: 'Cancelar'
      }
    })
  }, [isDark, navigation])

  return (
    <FiguresList
      filter={debouncedFilter}
      style={{ marginTop: Platform.OS === 'android' ? headerHeight : 0 }}
    />
  )
}
