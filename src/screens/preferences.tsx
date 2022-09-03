import * as React from 'react'

import { useDensityUnits, useRealm, useUnits, useVolumeUnits } from '../hooks'
import { DensityUnit, Unit, VolumeUnit } from '../services/realm'
import { Form } from '../ui'
import { Section } from '../ui/section'

export function PreferencesScreen() {
  const units = useUnits()
  const volumeUnits = useVolumeUnits()
  const densityUnits = useDensityUnits()

  const realm = useRealm()

  function onUnitPress(name: string) {
    const unit = realm.objectForPrimaryKey<Unit>('Unit', name)

    if (!unit) return

    realm.write(() => {
      unit.selected = !unit.selected
    })
  }

  function onVolumeUnitPress(name: string) {
    const unit = realm.objectForPrimaryKey<VolumeUnit>('VolumeUnit', name)

    if (!unit) return

    realm.write(() => {
      unit.selected = !unit.selected
    })
  }

  function onDensityUnitPress(name: string) {
    const unit = realm.objectForPrimaryKey<DensityUnit>('DensityUnit', name)

    if (!unit) return

    realm.write(() => {
      unit.selected = !unit.selected
    })
  }

  return (
    <Form padding={false}>
      <Section
        title="UNIDADES"
        items={units.map(unit => ({
          label: unit.description,
          selected: unit.selected,
          onPress: () => onUnitPress(unit.name)
        }))}
        selectable
        showArrow={false}
        style={{ marginTop: 32 }}
      />

      <Section
        title="UNIDADES DE VOLUME"
        items={volumeUnits.map(unit => ({
          label: unit.description,
          selected: unit.selected,
          onPress: () => onVolumeUnitPress(unit.name)
        }))}
        selectable
        showArrow={false}
        style={{ marginTop: 32 }}
      />

      <Section
        title="UNIDADES DE DENSIDADE"
        items={densityUnits.map(unit => ({
          label: unit.description,
          selected: unit.selected,
          onPress: () => onDensityUnitPress(unit.name)
        }))}
        selectable
        showArrow={false}
        style={{ marginVertical: 32 }}
      />
    </Form>
  )
}
