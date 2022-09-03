import { useTheme } from '@react-navigation/native'
import * as React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export type SectionItemType = {
  readonly onPress?: () => void
  readonly label?: string
  readonly selected?: boolean
  readonly selectable?: boolean
  readonly isLast: boolean
  readonly isModal?: boolean
  readonly showArrow?: boolean
}

const DARK_MODAL_BACKGROUND = '#2C2C2E'
const DARK_MODAL_BORDER_COLOR = 'rgba(84, 84, 88, 0.65)'

const DARK_SCREEN_BACKGROUND = '#1C1C1E'
const DARK_SCREEN_BORDER_COLOR = '#38383A'

const LIGHT_MODAL_BACKGROUND = '#ffff'
const LIGHT_MODAL_BORDER_COLOR = 'rgba(60, 60, 67, 0.36)'

const LIGHT_SCREEN_BACKGROUND = '#ffff'
const LIGHT_SCREEN_BORDER_COLOR = '#C6C6C8'

export function SectionItem(props: SectionItemType) {
  const { label, onPress, selected, selectable, isLast, isModal, showArrow } =
    props

  const theme = useTheme()

  const textColor = theme.dark ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)'

  const borderColor = React.useMemo(() => {
    if (theme.dark && isModal) return DARK_MODAL_BORDER_COLOR

    if (theme.dark && !isModal) return DARK_SCREEN_BORDER_COLOR

    if (!theme.dark && isModal) return LIGHT_MODAL_BORDER_COLOR

    return LIGHT_SCREEN_BORDER_COLOR
  }, [isModal, theme.dark])

  const backgroundColor = React.useMemo(() => {
    if (theme.dark && isModal) return DARK_MODAL_BACKGROUND

    if (theme.dark && !isModal) return DARK_SCREEN_BACKGROUND

    if (!theme.dark && isModal) return LIGHT_MODAL_BACKGROUND

    return LIGHT_SCREEN_BACKGROUND
  }, [isModal, theme.dark])

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor }]}
      activeOpacity={0.8}
      onPress={onPress}
      disabled={!onPress}
    >
      {selectable && (
        <Icon
          name="check"
          size={20}
          color={theme.colors.primary}
          style={{ opacity: selected ? 1 : 0, marginRight: 8 }}
        />
      )}

      <View
        style={[
          styles.content,
          { borderColor, borderBottomWidth: isLast ? 0 : 0.5 }
        ]}
      >
        <Text numberOfLines={1} style={[styles.label, { color: textColor }]}>
          {label}
        </Text>

        {selectable && onPress && showArrow && (
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
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    paddingLeft: 16
  },
  content: {
    flex: 1,
    paddingRight: 16,
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 10
  },
  label: {
    flex: 1,
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.41,
    height: 22
  },
  arrow: {
    marginLeft: 'auto'
  }
})
