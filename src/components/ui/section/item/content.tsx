import { useTheme } from '@react-navigation/native'
import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { SectionItemText } from './text'

interface SectionItemContentProps {
  borderColor?: string

  children: string
  isLast?: boolean
  height?: number
  pressable?: boolean
  showArrow?: boolean
}

export function SectionItemContent({
  borderColor,
  children,
  height,
  isLast,
  pressable,
  showArrow
}: SectionItemContentProps) {
  const theme = useTheme()

  return (
    <View
      style={[
        styles.content,
        { borderColor, borderBottomWidth: isLast ? 0 : 0.5, height }
      ]}
    >
      {children && <SectionItemText>{children}</SectionItemText>}

      {pressable && showArrow && (
        <Icon
          name="chevron-right"
          size={20}
          color={
            theme.dark ? 'rgba(235, 235, 245, 0.3)' : 'rgba(60, 60, 67, 0.3)'
          }
          style={styles.arrow}
        />
      )}
    </View>
  )
}

SectionItemContent.displayName = 'Section.Item.Content'

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingRight: 16,
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 10
  },
  arrow: {
    marginLeft: 'auto'
  }
})
