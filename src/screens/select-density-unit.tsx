import * as React from 'react'
import { ScrollView, StatusBar, StyleSheet } from 'react-native'

import { useDensityUnits } from '../hooks'
import { RootStackScreenProps } from '../navigation/types'
import { DensityUnit } from '../types/unit'
import { Section } from '../ui'

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

  const filteredUnits = densityUnits.filter(unit => unit.visible)

  return (
    <ScrollView contentContainerStyle={styles.list}>
      <StatusBar barStyle="light-content" />

      <Section title="UNIDADES" selectable isModal>
        {filteredUnits.map((item, index) => (
          <Section.Item
            key={item.description}
            label={item.description}
            selected={item.name === unit}
            onPress={() => onUnitSelect(item.name)}
            isFirst={index === 0}
            isLast={index + 1 === filteredUnits.length}
          />
        ))}
      </Section>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  list: {
    flex: 1
  }
})
