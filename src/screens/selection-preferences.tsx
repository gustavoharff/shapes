import * as React from 'react'
import { StyleSheet } from 'react-native'

import { useDensityUnits, useRealm, useUnits } from '../hooks'
import { DensityUnit, Unit } from '../services/realm'
import { Form, Section } from '../ui'

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
            selected={unit.selected}
            onPress={() => onUnitPress(unit.name)}
            isFirst={index === 0}
            isLast={index + 1 === units.length}
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
            selected={unit.selected}
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
