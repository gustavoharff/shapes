import * as React from 'react'

import { useDensityUnits, useRealm, useUnits } from 'hooks'
import { t } from 'i18n'
import { DensityUnit, Unit } from 'models'
import { Form, Section } from 'ui'

export function SelectionPreferencesScreen() {
  const units = useUnits()
  const densityUnits = useDensityUnits()

  const realm = useRealm()

  function onUnitPress(name: string) {
    const oldUnits = realm.objects<Unit>('Unit').filtered('selected == true')

    const unit = realm.objectForPrimaryKey<Unit>('Unit', name)

    if (!unit) return

    realm.write(() => {
      for (const oldUnit of oldUnits) {
        oldUnit.selected = false
      }

      unit.selected = !unit.selected
    })
  }

  function onDensityUnitPress(name: string) {
    const oldUnits = realm
      .objects<DensityUnit>('DensityUnit')
      .filtered('selected == true')

    const unit = realm.objectForPrimaryKey<DensityUnit>('DensityUnit', name)

    if (!unit) return

    realm.write(() => {
      for (const oldUnit of oldUnits) {
        oldUnit.selected = false
      }

      unit.selected = !unit.selected
    })
  }

  return (
    <Form>
      <Section selectable showArrow={false} style={{ marginTop: 32 }}>
        <Section.Header>{t('units.title')}</Section.Header>

        {units.map(unit => (
          <Section.Item
            key={unit.description}
            selected={unit.selected}
            onPress={() => onUnitPress(unit.symbol)}
          >
            {t(`units.${unit.symbol}`)}
          </Section.Item>
        ))}
      </Section>

      <Section selectable showArrow={false} style={{ marginVertical: 32 }}>
        <Section.Header>{t('density-units.title')}</Section.Header>

        {densityUnits.map(unit => (
          <Section.Item
            key={unit.description}
            selected={unit.selected}
            onPress={() => onDensityUnitPress(unit.symbol)}
          >
            {t(`density-units.${unit.symbol}`)}
          </Section.Item>
        ))}
      </Section>
    </Form>
  )
}
