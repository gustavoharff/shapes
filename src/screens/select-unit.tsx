import * as React from 'react'
import { ScrollView, StatusBar } from 'react-native'

import { RootStackScreenProps } from '../navigation/types'
import { Unit } from '../types/unit'
import { Section } from '../ui/section'

type SelectUnitProps = RootStackScreenProps<'SelectUnit'>

type UnitsType = Array<{ unit: Unit; label: string }>

const units: UnitsType = [
  { unit: 'm', label: 'Metro (m)' },
  { unit: 'cm', label: 'Centímetro (cm)' },
  { unit: 'mm', label: 'Milímetro (mm)' }
]

export function SelectUnit({ route, navigation }: SelectUnitProps) {
  const { unit, onSelect } = route.params

  function onUnitSelect(selectedUnit: Unit) {
    onSelect(selectedUnit)
    navigation.goBack()
  }

  return (
    <ScrollView>
      <StatusBar barStyle="light-content" />

      <Section
        title="UNIDADES"
        selectable
        items={units.map(item => ({
          label: item.label,
          selected: item.unit === unit,
          onPress: () => onUnitSelect(item.unit)
        }))}
      />
    </ScrollView>
  )
}
