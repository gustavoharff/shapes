import * as React from 'react'
import { ScrollView, StatusBar } from 'react-native'

import { RootStackScreenProps } from '../navigation/types'
import { DensityUnit } from '../types/unit'
import { Section } from '../ui/section'

type SelectDensityUnitProps = RootStackScreenProps<'SelectDensityUnit'>

type DensityUnitsType = Array<{ unit: DensityUnit; label: string }>

const densityUnits: DensityUnitsType = [
  { unit: 'kg/l', label: 'Quilograma por litro (kg/l)' },
  { unit: 'kg/m³', label: 'Quilograma por metro cúbico (kg/m³)' },
  { unit: 'kg/cm³', label: 'Quilograma por centímetro cúbico (kg/cm³)' },
  { unit: 'kg/mm³', label: 'Quilograma por milímetro cúbico (kg/mm³)' }
]

export function SelectDensityUnit({
  route,
  navigation
}: SelectDensityUnitProps) {
  const { unit, onSelect } = route.params

  function onUnitSelect(selectedUnit: DensityUnit) {
    onSelect(selectedUnit)
    navigation.goBack()
  }

  return (
    <ScrollView>
      <StatusBar barStyle="light-content" />

      <Section
        title="UNIDADES"
        selectable
        items={densityUnits.map(densityUnit => ({
          label: densityUnit.label,
          selected: densityUnit.unit === unit,
          onPress: () => onUnitSelect(densityUnit.unit)
        }))}
      />
    </ScrollView>
  )
}
