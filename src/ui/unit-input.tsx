import { useNavigation, useTheme } from '@react-navigation/native'
import * as React from 'react'
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native'

import { SectionContext } from '../contexts'
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
  readonly isLast?: boolean
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
    containerStyles,
    isLast
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

  const sectionContext = React.useContext(SectionContext)

  const backgroundColor = theme.dark ? '#1C1C1E' : '#FFFFFF'

  const border = React.useMemo(() => {
    if (sectionContext && isLast)
      return {
        borderBottomWidth: 0,
        borderBottomColor: 'transparent'
      }

    return {
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: theme.dark ? '#38383A' : '#C6C6C8'
    }
  }, [isLast, sectionContext, theme.dark])

  return (
    <View style={[styles.container, { backgroundColor }, containerStyles]}>
      <Input
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType="numeric"
        editable={editable}
        isLast={isLast}
      />

      <View style={{ ...border }}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onButtonPress}
          style={styles.button}
        >
          <Text style={[styles.buttonText, { color: theme.colors.primary }]}>
            {unitValue}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  button: {
    paddingVertical: 11
  },
  buttonText: {
    marginRight: 16,
    fontSize: 17,
    lineHeight: 22
  }
})
