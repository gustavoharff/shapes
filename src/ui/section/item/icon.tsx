import * as React from 'react'
import { StyleSheet, View } from 'react-native'

interface SectionItemIconProps {
  children: React.ReactNode
}

export function SectionItemIcon({ children }: SectionItemIconProps) {
  return <View style={styles.container}>{children}</View>
}

SectionItemIcon.displayName = 'Section.Item.Icon'

const styles = StyleSheet.create({
  container: {
    marginRight: 8,
    paddingVertical: 4
  }
})
