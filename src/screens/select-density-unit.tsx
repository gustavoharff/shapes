import * as React from 'react'
import { ScrollView, StatusBar } from 'react-native'

import { useDensityUnits } from '../hooks'
import { RootStackScreenProps } from '../navigation/types'
import { DensityUnit } from '../types/unit'
import { Section } from '../ui/section'

type SelectDensityUnitProps = RootStackScreenProps<'SelectDensityUnit'>

export function SelectDensityUnit({
  route,
  navigation
}: SelectDensityUnitProps) {
  const { unit, onSelect } = route.params

  const densityUnits = useDensityUnits()

  function onUnitSelect(selectedUnit: DensityUnit) {
    onSelect(selectedUnit)
    navigation.goBack()
  }

  const filteredUnits = densityUnits.filter(unit => unit.selected)

  return (
    <ScrollView>
      <StatusBar barStyle="light-content" />

      <Section
        title="UNIDADES"
        selectable
        items={filteredUnits.map(densityUnit => ({
          label: densityUnit.description,
          selected: densityUnit.name === unit,
          onPress: () => onUnitSelect(densityUnit.name)
        }))}
        isModal
      />
    </ScrollView>
  )
}
