import { useTheme } from '@react-navigation/native'
import * as React from 'react'
import { Button, StyleProp, StyleSheet, View, ViewStyle } from 'react-native'

import { Input } from './input'

interface UnitInputProps {
  readonly placeholder: string
  readonly value: string
  readonly onChangeText: (text: string) => void
  readonly unitValue: string
  readonly onUnitPress: () => void
  readonly editable?: boolean
  readonly containerStyles?: StyleProp<ViewStyle>
}

export function UnitInput(props: UnitInputProps) {
  const {
    placeholder,
    value,
    onChangeText,
    unitValue,
    onUnitPress,
    editable,
    containerStyles
  } = props

  const theme = useTheme()

  return (
    <View style={[styles.container, containerStyles]}>
      <Input
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType="numeric"
        editable={editable}
        style={{ flex: 1 }}
      />

      <Button
        title={unitValue}
        color={theme.colors.primary}
        onPress={onUnitPress}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  }
})
