import * as React from 'react'
import { StyleSheet, View } from 'react-native'

import { useWeight } from '../hooks'
import { useDefaultDensityUnit } from '../hooks/use-default-density-unit'
import { useDefaultUnit } from '../hooks/use-default-unit'
import { DensityUnit, Unit } from '../types/unit'
import { Form, Parallelepiped, VolumeTip, WeightTip } from '../ui'
import { Section } from '../ui/section'
import { UnitInput } from '../ui/unit-input'
import { cmToM, mmToM } from '../utils'

export function ParallelepipedFormScreen() {
  const defaultUnit = useDefaultUnit()

  const [width, setWidth] = React.useState('')
  const [widthUnit, setWidthUnit] = React.useState<Unit>(defaultUnit)

  const [height, setHeight] = React.useState('')
  const [heightUnit, setHeightUnit] = React.useState<Unit>(defaultUnit)

  const [greeting, setGreeting] = React.useState('')
  const [greetingUnit, setGreetingUnit] = React.useState<Unit>(defaultUnit)

  const defaultDensityUnit = useDefaultDensityUnit()

  const [specificWeight, setSpecificWeight] = React.useState('')
  const [specificWeightUnit, setSpecificWeightUnit] =
    React.useState<DensityUnit>(defaultDensityUnit)

  // m
  const volume = React.useMemo(() => {
    if (!width) return 0
    if (!height) return 0
    if (!greeting) return 0

    const widthValue = Number(width.replace(',', '.'))
    const heightValue = Number(height.replace(',', '.'))
    const greetingValue = Number(greeting.replace(',', '.'))

    if (Number.isNaN(widthValue)) return 0

    let widthM: number
    let heightM: number
    let greetingM: number

    switch (widthUnit) {
      case 'cm':
        widthM = cmToM(widthValue)
        break
      case 'm':
        widthM = widthValue
        break
      case 'mm':
        widthM = mmToM(widthValue)
        break
    }

    switch (heightUnit) {
      case 'cm':
        heightM = cmToM(heightValue)
        break
      case 'm':
        heightM = heightValue
        break
      case 'mm':
        heightM = mmToM(heightValue)
        break
    }

    switch (greetingUnit) {
      case 'cm':
        greetingM = cmToM(greetingValue)
        break
      case 'm':
        greetingM = greetingValue
        break
      case 'mm':
        greetingM = mmToM(greetingValue)
        break
    }

    return widthM * heightM * greetingM
  }, [greeting, greetingUnit, height, heightUnit, width, widthUnit])

  const weight = useWeight(specificWeight, specificWeightUnit, volume)

  return (
    <Form style={styles.form}>
      <View style={styles.cube}>
        <Parallelepiped size={120} />
      </View>

      <Section style={{ marginTop: 16 }}>
        <UnitInput
          type="unit"
          label="Largura"
          value={width}
          onChangeText={setWidth}
          unitValue={widthUnit}
          onChangeUnit={setWidthUnit}
        />

        <UnitInput
          type="unit"
          label="Altura"
          value={height}
          onChangeText={setHeight}
          unitValue={heightUnit}
          onChangeUnit={setHeightUnit}
        />

        <UnitInput
          type="unit"
          label="Cumprimento"
          value={greeting}
          onChangeText={setGreeting}
          unitValue={greetingUnit}
          onChangeUnit={setGreetingUnit}
          isLast
        />
      </Section>

      <VolumeTip volume={volume} style={styles.tip} />

      <Section disabled={!greeting || !height} style={{ marginTop: 16 }}>
        <UnitInput
          type="density-unit"
          label="Peso especifico"
          value={specificWeight}
          onChangeText={setSpecificWeight}
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
  cube: {
    alignItems: 'center'
  },
  tip: {
    marginTop: 16
  }
})
