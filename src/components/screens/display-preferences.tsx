import type { DensityUnit, Unit, VolumeUnit } from 'models'

import * as React from 'react'

import { useDensityUnits, useRealm, useUnits, useVolumeUnits } from 'hooks'
import { t } from 'i18n'
import { Form, Section } from 'ui'

export function DisplayPreferencesScreen() {
  const units = useUnits()
  const volumeUnits = useVolumeUnits()
  const densityUnits = useDensityUnits()

  const realm = useRealm()

  function onUnitPress(name: string) {
    const unit = realm.objectForPrimaryKey<Unit>('Unit', name)

    if (!unit) return

    realm.write(() => {
      unit.visible = !unit.visible
    })
  }

  function onVolumeUnitPress(name: string) {
    const unit = realm.objectForPrimaryKey<VolumeUnit>('VolumeUnit', name)

    if (!unit) return

    realm.write(() => {
      unit.visible = !unit.visible
    })
  }

  function onDensityUnitPress(name: string) {
    const unit = realm.objectForPrimaryKey<DensityUnit>('DensityUnit', name)

    if (!unit) return

    realm.write(() => {
      unit.visible = !unit.visible
    })
  }

  return (
    <Form>
      <Section selectable showArrow={false} style={{ marginTop: 32 }}>
        <Section.Header>{t('units.title')}</Section.Header>

        {units.map(unit => (
          <Section.Item
            key={unit.symbol}
            selected={unit.visible}
            onPress={() => onUnitPress(unit.symbol)}
          >
            {t(`units.${unit.symbol}`)}
          </Section.Item>
        ))}
      </Section>

      <Section selectable showArrow={false} style={{ marginTop: 32 }}>
        <Section.Header>{t('volume-units.title')}</Section.Header>

        {volumeUnits.map(unit => (
          <Section.Item
            key={unit.symbol}
            selected={unit.visible}
            onPress={() => onVolumeUnitPress(unit.symbol)}
          >
            {t(`volume-units.${unit.symbol}`)}
          </Section.Item>
        ))}
      </Section>

      <Section selectable showArrow={false} style={{ marginVertical: 32 }}>
        <Section.Header>{t('density-units.title')}</Section.Header>

        {densityUnits.map(unit => (
          <Section.Item
            key={unit.description}
            selected={unit.visible}
            onPress={() => onDensityUnitPress(unit.symbol)}
          >
            {t(`density-units.${unit.symbol}`)}
          </Section.Item>
        ))}
      </Section>
    </Form>
  )
}
