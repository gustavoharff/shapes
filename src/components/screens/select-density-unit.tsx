import * as React from 'react'
import { ScrollView, StatusBar, StyleSheet } from 'react-native'

import { useDensityUnits } from 'hooks'
import { t } from 'i18n'
import { DensityUnitSymbol } from 'models'
import { RootStackScreenProps } from 'navigation'
import { Section } from 'ui'

export function SelectDensityUnit(
  props: RootStackScreenProps<'SelectDensityUnit'>
) {
  const { unit, onSelect } = props.route.params
  const { navigation } = props

  const densityUnits = useDensityUnits()

  function onUnitSelect(selectedUnit: DensityUnitSymbol) {
    onSelect(selectedUnit)
    navigation.goBack()
  }

  const filteredUnits = densityUnits.filter(unit => unit.visible)

  return (
    <ScrollView contentContainerStyle={styles.list}>
      <StatusBar barStyle="light-content" />

      <Section selectable isModal>
        <Section.Header>{t('density-units.title')}</Section.Header>

        {filteredUnits.map(item => (
          <Section.Item
            key={item.symbol}
            selected={item.symbol === unit}
            onPress={() => onUnitSelect(item.symbol)}
          >
            {t(`density-units.${item.symbol}`)}
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
