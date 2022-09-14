import * as React from 'react'
import { ScrollView, StatusBar, StyleSheet } from 'react-native'

import { useUnits } from '../hooks'
import { RootStackScreenProps } from '../navigation/types'
import { Unit } from '../types/unit'
import { HeaderTextButton, Section } from '../ui'

type SelectUnitProps = RootStackScreenProps<'SelectUnit'>

export function SelectUnit({ route, navigation }: SelectUnitProps) {
  const { unit, onSelect } = route.params

  const units = useUnits()

  function onUnitSelect(selectedUnit: Unit) {
    onSelect(selectedUnit)
    navigation.goBack()
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderTextButton bold onPress={navigation.goBack}>
          OK
        </HeaderTextButton>
      )
    })
  }, [navigation])

  const filteredUnits = units.filter(unit => unit.visible)

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
