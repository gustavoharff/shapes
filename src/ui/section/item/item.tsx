import { useTheme } from '@react-navigation/native'
import * as React from 'react'
import { useContext } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { SectionContext } from '../../../contexts'
import { SectionItemContent } from './content'
import { SectionItemIcon } from './icon'

export type SectionItemType = {
  readonly onPress?: () => void
  readonly selected?: boolean
  readonly isFirst?: boolean
  readonly isLast?: boolean
  readonly children?: React.ReactNode
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
  const { onPress, selected, isFirst, isLast, children } = props

  const theme = useTheme()

  const { isModal, showArrow, selectable, radius } = useContext(SectionContext)

  const [height, setHeight] = React.useState<number | undefined>(undefined)

  const borders = React.useMemo(() => {
    if (!radius || (!isFirst && !isLast)) {
      return {
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0
      }
    }

    return {
      borderTopLeftRadius: isFirst ? 12 : 0,
      borderTopRightRadius: isFirst ? 12 : 0,
      borderBottomLeftRadius: isLast ? 12 : 0,
      borderBottomRightRadius: isLast ? 12 : 0
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
      {selectable && (
        <Icon
          name="check"
          size={20}
          color={theme.colors.primary}
          style={{ opacity: selected ? 1 : 0, marginRight: 8 }}
        />
      )}

      {React.Children.map(children, child => {
        if (typeof child === 'string') {
          return (
            <SectionItemContent
              borderColor={borderColor}
              height={height}
              isLast={isLast}
              pressable={!!onPress}
              showArrow
            >
              {child}
            </SectionItemContent>
          )
        }

        // @ts-expect-error Property `type` exists
        if (child?.type?.displayName === 'Section.Item.Content') {
          return React.cloneElement(child as React.ReactElement, {
            borderColor,
            height,
            isLast,
            pressable: !!onPress,
            showArrow
          })
        }

        return child
      })}
    </TouchableOpacity>
  )
}

SectionItem.Icon = SectionItemIcon
SectionItem.Content = SectionItemContent

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16
  }
})
