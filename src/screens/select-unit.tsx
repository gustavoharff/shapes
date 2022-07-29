import * as React from 'react'
import { ScrollView, StatusBar } from 'react-native'

import { RootStackScreenProps } from '../navigation/types'
import { Unit } from '../types/unit'
import { Section } from '../ui/section'

type SelectUnitProps = RootStackScreenProps<'SelectUnit'>

const unitMap: Record<Unit, string> = {
  m: 'Metro (m)',
  cm: 'Centimetro (cm)',
  mm: 'Milímetro (mm)'
}

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
        items={[
          {
            label: unitMap.m,
            onPress: () => onUnitSelect('m'),
            selected: unit === 'm'
          },
          {
            label: unitMap.cm,
            onPress: () => onUnitSelect('cm'),
            selected: unit === 'cm'
          },
          {
            label: unitMap.mm,
            onPress: () => onUnitSelect('mm'),
            selected: unit === 'mm'
          }
        ]}
      />
    </ScrollView>
  )
}
