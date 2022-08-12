import { useTheme } from '@react-navigation/native'
import * as React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export type SectionItemType = {
  onPress?: () => void
  label?: string
  selected?: boolean
  selectable?: boolean
}

export function SectionItem(props: SectionItemType) {
  const { label, onPress, selected, selectable } = props

  const theme = useTheme()

  const borderColor = theme.dark ? 'rgb(50, 50, 53)' : 'rgb(237, 237, 238)'
  const backgroundColor = theme.dark ? 'rgb(44, 44, 46)' : 'rgb(255, 255, 255)'
  const textColor = theme.dark ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)'

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor }]}
      activeOpacity={0.6}
      onPress={onPress}
      disabled={!onPress}
    >
      {selectable && (
        <Icon
          name="check"
          size={24}
          color={theme.colors.primary}
          style={{ opacity: selected ? 1 : 0 }}
        />
      )}

      <View style={[styles.content, { borderColor }]}>
        <Text style={[styles.label, { color: textColor }]}>{label}</Text>
        {selectable && onPress && (
          <Icon
            name="chevron-right"
            size={24}
            color={theme.colors.primary}
            style={styles.arrow}
          />
        )}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    height: 48
  },
  content: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    height: 48,
    borderBottomWidth: 1
  },
  label: {
    marginLeft: 8
  },
  arrow: {
    marginLeft: 'auto'
  }
})
