import * as React from 'react'
import { ScrollView, StatusBar } from 'react-native'

import { useUnits } from '../hooks'
import { RootStackScreenProps } from '../navigation/types'
import { Unit } from '../types/unit'
import { Section } from '../ui/section'

type SelectUnitProps = RootStackScreenProps<'SelectUnit'>

export function SelectUnit({ route, navigation }: SelectUnitProps) {
  const { unit, onSelect } = route.params

  const units = useUnits()

  function onUnitSelect(selectedUnit: Unit) {
    onSelect(selectedUnit)
    navigation.goBack()
  }

  const filteredUnits = units.filter(unit => unit.selected)

  return (
    <ScrollView>
      <StatusBar barStyle="light-content" />

      <Section
        title="UNIDADES"
        selectable
        items={filteredUnits.map(item => ({
          label: item.description,
          selected: item.name === unit,
          onPress: () => onUnitSelect(item.name)
        }))}
        isModal
      />
    </ScrollView>
  )
}
