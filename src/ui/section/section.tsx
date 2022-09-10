import { useTheme } from '@react-navigation/native'
import * as React from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'

import { SectionContext } from '../../contexts'
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
  readonly disabled?: boolean
}

export function Section(props: SectionProps) {
  const {
    title,
    children,
    style,
    radius,
    showArrow = true,
    isModal,
    selectable,
    disabled
  } = props

  const theme = useTheme()

  const borderColor = React.useMemo(() => {
    if (radius) return 'transparent'

    return theme.dark ? '#38383A' : '#C6C6C8'
  }, [radius, theme.dark])

  return (
    <SectionContext.Provider value={{ showArrow, isModal, selectable, radius }}>
      <View
        style={[
          style,
          { paddingHorizontal: radius ? 16 : 0, opacity: disabled ? 0.6 : 1 }
        ]}
      >
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
