import * as React from 'react'
import { ScrollView, StatusBar } from 'react-native'

import { RootStackScreenProps } from '../navigation/types'
import { DensityUnit } from '../types/unit'
import { Section } from '../ui/section'

type SelectDensityUnitProps = RootStackScreenProps<'SelectDensityUnit'>

const unitMap: Record<DensityUnit, string> = {
  'kg/m³': 'Quilograma por metro cúbico (kg/m³)'
}

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
        items={[
          {
            label: unitMap['kg/m³'],
            onPress: () => onUnitSelect('kg/m³'),
            selected: unit === 'kg/m³'
          }
        ]}
      />
    </ScrollView>
  )
}
