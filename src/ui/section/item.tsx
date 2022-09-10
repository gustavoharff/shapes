import { useTheme } from '@react-navigation/native'
import * as React from 'react'
import { useContext } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { SectionContext } from '../../contexts'

export type SectionItemType = {
  readonly onPress?: () => void
  readonly label?: string
  readonly selected?: boolean
  readonly isFirst: boolean
  readonly isLast: boolean
  readonly leftContent?: () => JSX.Element
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
  const { label, onPress, selected, isFirst, isLast, leftContent } = props

  const theme = useTheme()

  const { isModal, showArrow, selectable, radius } = useContext(SectionContext)

  const [height, setHeight] = React.useState<number | undefined>(undefined)

  const textColor = theme.dark ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)'

  const borders = React.useMemo(() => {
    if (!radius || (!isFirst && !isLast)) {
      return {
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0
      }
    }

    if (isFirst && isLast) {
      return {
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12
      }
    }

    if (isFirst) {
      return {
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0
      }
    }

    return {
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      borderBottomLeftRadius: 12,
      borderBottomRightRadius: 12
    }
  }, [isFirst, isLast, radius])

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
      style={[styles.container, { backgroundColor, ...borders }]}
      activeOpacity={0.9}
      onPress={onPress}
      disabled={!onPress}
      onLayout={e => setHeight(e.nativeEvent.layout.height)}
    >
      {leftContent && leftContent()}

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
          { borderColor, borderBottomWidth: isLast ? 0 : 0.5, height }
        ]}
      >
        <Text numberOfLines={1} style={[styles.label, { color: textColor }]}>
          {label}
        </Text>

        {onPress && showArrow && (
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
