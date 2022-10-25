import * as React from 'react'
import { StyleSheet, View } from 'react-native'

import { useDefaultDensityUnit, useDefaultUnit, useWeight } from 'hooks'
import { DensityUnit, Unit } from 'types'
import {
  Form,
  HexagonalPrism,
  Section,
  UnitInput,
  VolumeTip,
  WeightTip
} from 'ui'
import { cmToM, mmToM } from 'utils'

export function HexagonalPrismFormScreen() {
  const defaultUnit = useDefaultUnit()

  const [width, setWidth] = React.useState('')
  const [widthUnit, setWidthUnit] = React.useState<Unit>(defaultUnit)

  const [height, setHeight] = React.useState('')
  const [heightUnit, setHeightUnit] = React.useState<Unit>(defaultUnit)

  const defaultDensityUnit = useDefaultDensityUnit()

  const [specificWeight, setSpecificWeight] = React.useState('')
  const [specificWeightUnit, setSpecificWeightUnit] =
    React.useState<DensityUnit>(defaultDensityUnit)

  // m
  const volume = React.useMemo(() => {
    if (!width) return 0
    if (!height) return 0

    const widthValue = Number(width.replace(',', '.'))
    const heightValue = Number(height.replace(',', '.'))

    if (Number.isNaN(widthValue)) return 0

    let widthM: number
    let heightM: number

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

    return ((6 * widthM ** 2 * Math.sqrt(3)) / 4) * heightM
  }, [height, heightUnit, width, widthUnit])

  const weight = useWeight(specificWeight, specificWeightUnit, volume)

  return (
    <Form>
      <View style={styles.cube}>
        <HexagonalPrism size={120} />
      </View>

      <Section style={{ marginTop: 16 }}>
        <UnitInput
          type="unit"
          label="Largura"
          value={width}
          onChangeText={setWidth}
          unitValue={widthUnit}
          onChangeUnit={setWidthUnit}
          placeholder="0"
        />

        <UnitInput
          type="unit"
          label="Altura"
          value={height}
          onChangeText={setHeight}
          unitValue={heightUnit}
          onChangeUnit={setHeightUnit}
          placeholder="0"
        />
      </Section>

      <VolumeTip volume={volume} style={styles.tip} />

      <Section disabled={!Number(height)} style={{ marginTop: 16 }}>
        <UnitInput
          type="density-unit"
          label="Peso específico"
          value={specificWeight}
          onChangeText={setSpecificWeight}
          unitValue={specificWeightUnit}
          onChangeUnit={setSpecificWeightUnit}
          placeholder="0"
          isLast
        />
      </Section>

      <WeightTip weight={weight} style={styles.tip} />
    </Form>
  )
}

const styles = StyleSheet.create({
  cube: {
    alignItems: 'center'
  },
  tip: {
    marginTop: 16,
    marginBottom: 32
  }
})
