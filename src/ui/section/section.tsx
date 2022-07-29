import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { SectionItem, SectionItemType } from './item'

interface SectionProps {
  title?: string
  items: SectionItemType[]
  selectable?: boolean
}

export function Section({ title, selectable, items }: SectionProps) {
  return (
    <View>
      {title && <Text style={styles.title}>{title}</Text>}

      {items.map(item => (
        <SectionItem key={item.label} {...item} selectable={selectable} />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    marginLeft: 16,
    marginTop: 32,
    color: 'rgb(123, 123, 128)',
    marginBottom: 8
  }
})
