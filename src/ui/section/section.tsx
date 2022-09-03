import { useTheme } from '@react-navigation/native'
import * as React from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'

import { SectionHeader } from './header'
import { SectionItem, SectionItemType } from './item'

interface SectionProps {
  readonly title?: string
  readonly items: Omit<SectionItemType, 'selectable' | 'isLast'>[]
  readonly selectable?: boolean
  readonly style?: StyleProp<ViewStyle>
  readonly isModal?: boolean
}

export function Section(props: SectionProps) {
  const { title, selectable, items, isModal, style } = props

  const theme = useTheme()

  const borderColor = theme.dark ? '#38383A' : 'rgb(237, 237, 238)'

  return (
    <View style={style}>
      {title && <SectionHeader title={title} />}

      <View style={[styles.container, { borderColor }]}>
        {items.map((item, index) => (
          <SectionItem
            key={item.label}
            {...item}
            selectable={selectable}
            isLast={index + 1 === items.length}
            isModal={isModal}
          />
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5
  }
})
