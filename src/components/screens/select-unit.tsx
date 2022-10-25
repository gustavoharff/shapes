import * as React from 'react'
import { ScrollView, StatusBar, StyleSheet } from 'react-native'

import { useUnits } from 'hooks'
import { RootStackScreenProps } from 'navigation'
import { Unit } from 'types'
import { HeaderTextButton, Section } from 'ui'

export function SelectUnit(props: RootStackScreenProps<'SelectUnit'>) {
  const { unit, onSelect } = props.route.params
  const { navigation } = props

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

      <Section selectable isModal>
        <Section.Header>Unidades</Section.Header>

        {filteredUnits.map(item => (
          <Section.Item
            key={item.description}
            selected={item.name === unit}
            onPress={() => onUnitSelect(item.name)}
          >
            {item.description}
          </Section.Item>
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