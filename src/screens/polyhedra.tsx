import { useFocusEffect, useTheme } from '@react-navigation/native'
import * as React from 'react'
import { Platform, useColorScheme } from 'react-native'

import { useDebounce } from '../hooks'
import { RootStackScreenProps } from '../navigation/types'
import { HeaderIconButton, PolyhedraList } from '../ui'

export function PolyhedraScreen(props: RootStackScreenProps<'Polyhedra'>) {
  const { navigation } = props

  const [filter, setFilter] = React.useState('')
  const isDark = useColorScheme() === 'dark'

  const theme = useTheme()

  const debouncedFilter = useDebounce(filter, 200)

  useFocusEffect(
    React.useCallback(() => {
      const parent = navigation.getParent()
      parent?.setOptions({
        headerTitle: 'Poliedros'
      })

      if (Platform.OS === 'android') return

      parent?.setOptions({
        headerSearchBarOptions: {
          onChangeText: (event: any) => setFilter(event.nativeEvent.text),
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
  )

  React.useLayoutEffect(() => {
    navigation.getParent()?.setOptions({
      headerRight: () => (
        <HeaderIconButton
          name="cog-outline"
          onPress={() => navigation.navigate('Settings')}
        />
      )
    })
  }, [navigation])

  return <PolyhedraList filter={debouncedFilter} />
}
