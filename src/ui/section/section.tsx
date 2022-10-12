import { useTheme } from '@react-navigation/native'
import * as React from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'

import { SectionContext } from '../../contexts'
import { SectionHeader } from './header'
import { SectionItem } from './item'

interface SectionProps {
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

  const opacity = disabled ? 0.6 : 1
  const paddingHorizontal = radius ? 16 : 0

  const list = React.useMemo(() => {
    return React.Children.toArray(children).filter(child => {
      // @ts-expect-error Property `type` exists
      if (child?.type.displayName === 'Section.Header') return false

      return true
    })
  }, [children])

  function renderHeader() {
    return React.Children.map(children, child => {
      // @ts-expect-error Property `type` exists
      if (child?.type.displayName === 'Section.Header') {
        return React.cloneElement(child as React.ReactElement)
      }

      return null
    })
  }

  return (
    <View style={[style, { paddingHorizontal, opacity }]}>
      <SectionContext.Provider
        value={{ showArrow, isModal, selectable, radius }}
      >
        {renderHeader()}

        <View style={[styles.container, { borderColor }]}>
          {React.Children.map(list, (child, index) => {
            return React.cloneElement(child as React.ReactElement, {
              isFirst: index === 0,
              isLast: index + 1 === React.Children.toArray(list).length
            })
          })}
        </View>
      </SectionContext.Provider>
    </View>
  )
}

Section.Item = SectionItem
Section.Header = SectionHeader

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5
  }
})
