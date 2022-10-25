import { useTheme } from '@react-navigation/native'
import * as React from 'react'
import { Text, TouchableOpacity } from 'react-native'

interface HeaderTextButtonProps {
  readonly children: string
  readonly onPress?: () => void
  readonly bold?: boolean
}

export function HeaderTextButton(props: HeaderTextButtonProps) {
  const { children, onPress, bold } = props

  const theme = useTheme()

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <Text
        style={{
          color: theme.colors.primary,
          fontWeight: bold ? '600' : undefined
        }}
      >
        {children}
      </Text>
    </TouchableOpacity>
  )
}
