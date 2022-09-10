import { useTheme } from '@react-navigation/native'
import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface SectionHeaderProps {
  title: string
}

export function SectionHeader(props: SectionHeaderProps) {
  const { title } = props

  const theme = useTheme()

  const color = theme.dark ? '#EBEBF5' : '#3C3C43'

  return (
    <View style={styles.header}>
      <Text style={[styles.title, { color }]}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    height: 24
  },
  title: {
    fontSize: 12,
    opacity: 0.6,
    marginLeft: 16,
    marginBottom: 8
  }
})
