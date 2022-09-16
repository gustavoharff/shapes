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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

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
  readonly placeholder?: string
  readonly value: string
  readonly onChangeText: (text: string) => void
  readonly editable?: boolean
  readonly containerStyles?: StyleProp<ViewStyle>
  readonly isLast?: boolean
  readonly label: string
}

export function UnitInput(props: UnitInputProps) {
  const {
    type,
    placeholder,
    value,
    onChangeText,
    unitValue,
    onChangeUnit,
    editable = true,
    containerStyles,
    isLast,
    label
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
      borderBottomWidth: 0.5,
      borderBottomColor: theme.dark ? '#38383A' : '#C6C6C8'
    }
  }, [isLast, sectionContext, theme.dark])

  return (
    <View style={[styles.container, { backgroundColor }, containerStyles]}>
      <Input
        label={label}
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
          disabled={!editable}
        >
          <Text style={[styles.buttonText, { color: theme.colors.primary }]}>
            {unitValue}
          </Text>

          <Icon
            name="chevron-right"
            size={20}
            color={
              theme.dark ? 'rgba(235, 235, 245, 0.3)' : 'rgba(60, 60, 67, 0.3)'
            }
          />
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 11,
    flex: 1
  },
  buttonText: {
    fontSize: 17,
    lineHeight: 22,
    marginRight: 4
  }
})
