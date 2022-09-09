import * as React from 'react'
import { StyleSheet, View } from 'react-native'

import { useWeight } from '../hooks'
import { DensityUnit, Unit } from '../types/unit'
import { Cone, Form, VolumeTip, WeightTip } from '../ui'
import { Section } from '../ui/section'
import { UnitInput } from '../ui/unit-input'
import { cmToM, mmToM } from '../utils'

export function ConeFormScreen() {
  const [radius, setRadius] = React.useState('')
  const [radiusUnit, setRadiusUnit] = React.useState<Unit>('m')
  const [height, setHeight] = React.useState('')
  const [heightUnit, setHeightUnit] = React.useState<Unit>('m')

  const [specificWeight, setSpecificWeight] = React.useState('')
  const [specificWeightUnit, setSpecificWeightUnit] =
    React.useState<DensityUnit>('kg/m³')

  // m3
  const volume = React.useMemo(() => {
    if (!radius) return 0
    if (!height) return 0

    const radiusParsed = Number(radius.replace(',', '.'))
    const heightParsed = Number(height.replace(',', '.'))

    if (Number.isNaN(radiusParsed)) return 0
    if (Number.isNaN(heightParsed)) return 0

    let radiusM: number
    let heightM: number

    switch (radiusUnit) {
      case 'cm': {
        radiusM = cmToM(radiusParsed)
        break
      }
      case 'm': {
        radiusM = radiusParsed
        break
      }
      case 'mm': {
        radiusM = mmToM(radiusParsed)
        break
      }
    }

    switch (heightUnit) {
      case 'cm': {
        heightM = cmToM(heightParsed)
        break
      }
      case 'm': {
        heightM = heightParsed
        break
      }
      case 'mm': {
        heightM = mmToM(heightParsed)
        break
      }
    }

    return (Math.PI * radiusM ** 2 * heightM) / 3
  }, [height, heightUnit, radius, radiusUnit])

  const weight = useWeight(specificWeight, specificWeightUnit, volume)

  return (
    <Form style={styles.form}>
      <View style={styles.figure}>
        <Cone size={120} />
      </View>

      <Section>
        <UnitInput
          type="unit"
          placeholder="Raio da base"
          value={radius}
          onChangeText={setRadius}
          unitValue={radiusUnit}
          onChangeUnit={setRadiusUnit}
        />

        <UnitInput
          type="unit"
          placeholder="Altura"
          value={height}
          onChangeText={setHeight}
          unitValue={heightUnit}
          onChangeUnit={setHeightUnit}
          isLast
        />
      </Section>

      <VolumeTip volume={volume} style={styles.tip} />

      <Section style={{ marginTop: 16 }}>
        <UnitInput
          type="density-unit"
          placeholder="Peso especifico"
          value={specificWeight}
          onChangeText={setSpecificWeight}
          editable={!!radius && !!height}
          unitValue={specificWeightUnit}
          onChangeUnit={setSpecificWeightUnit}
          isLast
        />
      </Section>

      <WeightTip weight={weight} style={styles.tip} />
    </Form>
  )
}

const styles = StyleSheet.create({
  form: {
    paddingVertical: 16
  },
  figure: {
    alignItems: 'center'
  },
  tip: {
    marginTop: 16,
    marginHorizontal: 16
  }
})
