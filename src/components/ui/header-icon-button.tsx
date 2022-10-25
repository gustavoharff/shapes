import { useTheme } from '@react-navigation/native'
import * as React from 'react'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

interface HeaderIconButtonProps {
  readonly name: string
  readonly onPress?: () => void
}

export function HeaderIconButton(props: HeaderIconButtonProps) {
  const { name, onPress } = props

  const theme = useTheme()

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <Icon name={name} size={24} color={theme.colors.primary} />
    </TouchableOpacity>
  )
}
