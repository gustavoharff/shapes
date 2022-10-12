import { useTheme } from '@react-navigation/native'
import * as React from 'react'
import { StyleSheet, Text } from 'react-native'

interface SectionItemTextProps {
  children: string
}

export function SectionItemText({ children }: SectionItemTextProps) {
  const theme = useTheme()

  const textColor = theme.dark ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)'

  return (
    <Text numberOfLines={1} style={[styles.label, { color: textColor }]}>
      {children}
    </Text>
  )
}

SectionItemText.displayName = 'Section.Item.Text'

const styles = StyleSheet.create({
  label: {
    flex: 1,
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.41,
    height: 22
  }
})
