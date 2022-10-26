import * as React from 'react'
import { ScrollView, StatusBar, StyleSheet } from 'react-native'

import { useUnits } from 'hooks'
import { t } from 'i18n'
import { UnitSymbol } from 'models'
import { RootStackScreenProps } from 'navigation'
import { Section } from 'ui'

export function SelectUnit(props: RootStackScreenProps<'SelectUnit'>) {
  const { unit, onSelect } = props.route.params
  const { navigation } = props

  const units = useUnits()

  function onUnitSelect(selectedUnit: UnitSymbol) {
    onSelect(selectedUnit)
    navigation.goBack()
  }

  const filteredUnits = units.filter(unit => unit.visible)

  return (
    <ScrollView contentContainerStyle={styles.list}>
      <StatusBar barStyle="light-content" />

      <Section selectable isModal>
        <Section.Header>{t('units.title')}</Section.Header>

        {filteredUnits.map(item => (
          <Section.Item
            key={item.description}
            selected={item.symbol === unit}
            onPress={() => onUnitSelect(item.symbol)}
          >
            {t(`units.${item.symbol}`)}
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
