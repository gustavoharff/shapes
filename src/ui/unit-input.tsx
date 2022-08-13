import { useNavigation, useTheme } from '@react-navigation/native'
import * as React from 'react'
import { Button, StyleProp, StyleSheet, View, ViewStyle } from 'react-native'

import { DensityUnit, Unit } from '../types/unit'
import { Input } from './input'

type UnitInputType = {
  readonly type: 'unit'
  readonly unitValue: Unit
  readonly onChangeUnit: (unit: Unit) => void
}

type DensityUnitInputType = {
  readonly type: 'density-unit'
  readonly unitValue: DensityUnit
  readonly onChangeUnit: (densityUnit: DensityUnit) => void
}

type UnitInputProps = (UnitInputType | DensityUnitInputType) & {
  readonly placeholder: string
  readonly value: string
  readonly onChangeText: (text: string) => void
  readonly editable?: boolean
  readonly containerStyles?: StyleProp<ViewStyle>
}

export function UnitInput(props: UnitInputProps) {
  const {
    type,
    placeholder,
    value,
    onChangeText,
    unitValue,
    onChangeUnit,
    editable,
    containerStyles
  } = props

  const theme = useTheme()

  const navigation = useNavigation()

  function onButtonPress() {
    if (type === 'unit') {
      navigation.navigate('SelectUnit', {
        onSelect: onChangeUnit,
        unit: unitValue
      })
    } else {
      navigation.navigate('SelectDensityUnit', {
        onSelect: onChangeUnit,
        unit: unitValue
      })
    }
  }

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
        onPress={onButtonPress}
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
