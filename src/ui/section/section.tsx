import { useTheme } from '@react-navigation/native'
import * as React from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'

import { SectionContext } from './context'
import { SectionHeader } from './header'
import { SectionItem } from './item'

interface SectionProps {
  readonly title?: string
  readonly children: React.ReactNode
  readonly selectable?: boolean
  readonly style?: StyleProp<ViewStyle>
  readonly isModal?: boolean
  readonly showArrow?: boolean
  readonly radius?: boolean
}

export function Section(props: SectionProps) {
  const {
    title,
    children,
    style,
    radius,
    showArrow = true,
    isModal,
    selectable
  } = props

  const theme = useTheme()

  const borderColor = React.useMemo(() => {
    if (radius) return 'transparent'

    return theme.dark ? '#38383A' : 'rgb(237, 237, 238)'
  }, [radius, theme.dark])

  return (
    <SectionContext.Provider value={{ showArrow, isModal, selectable, radius }}>
      <View style={style}>
        {title && <SectionHeader title={title} />}

        <View style={[styles.container, { borderColor }]}>{children}</View>
      </View>
    </SectionContext.Provider>
  )
}

Section.Item = SectionItem

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5
  }
})
