import * as React from 'react'
import { StyleSheet } from 'react-native'

import { useDensityUnits, useRealm, useUnits, useVolumeUnits } from '../hooks'
import { DensityUnit, Unit, VolumeUnit } from '../services/realm'
import { Form, Section } from '../ui'

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
    <Form style={styles.form}>
      <Section
        title="UNIDADES"
        selectable
        showArrow={false}
        style={{ marginTop: 32 }}
      >
        {units.map((unit, index) => (
          <Section.Item
            key={unit.description}
            label={unit.description}
            selected={unit.visible}
            onPress={() => onUnitPress(unit.name)}
            isFirst={index === 0}
            isLast={index + 1 === units.length}
          />
        ))}
      </Section>

      <Section
        title="UNIDADES DE VOLUME"
        selectable
        showArrow={false}
        style={{ marginTop: 32 }}
      >
        {volumeUnits.map((unit, index) => (
          <Section.Item
            key={unit.description}
            label={unit.description}
            selected={unit.visible}
            onPress={() => onVolumeUnitPress(unit.name)}
            isFirst={index === 0}
            isLast={index + 1 === volumeUnits.length}
          />
        ))}
      </Section>

      <Section
        title="UNIDADES DE DENSIDADE"
        selectable
        showArrow={false}
        style={{ marginVertical: 32 }}
      >
        {densityUnits.map((unit, index) => (
          <Section.Item
            key={unit.description}
            label={unit.description}
            selected={unit.visible}
            onPress={() => onDensityUnitPress(unit.name)}
            isFirst={index === 0}
            isLast={index + 1 === densityUnits.length}
          />
        ))}
      </Section>
    </Form>
  )
}

const styles = StyleSheet.create({
  form: {
    flex: 1
  }
})
