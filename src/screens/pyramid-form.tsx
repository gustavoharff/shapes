import * as React from 'react'
import { StyleSheet, View } from 'react-native'

import { useDefaultDensityUnit, useDefaultUnit, useWeight } from '../hooks'
import { DensityUnit, Unit } from '../types/unit'
import { Form, Pyramid, Section, UnitInput, VolumeTip, WeightTip } from '../ui'
import { cmToM, mmToM } from '../utils'

export function PyramidFormScreen() {
  const defaultUnit = useDefaultUnit()

  const [height, setHeight] = React.useState('')
  const [heightUnit, setHeightUnit] = React.useState<Unit>(defaultUnit)

  const [width, setWidth] = React.useState('')
  const [widthUnit, setWidthUnit] = React.useState<Unit>(defaultUnit)

  const [depth, setDepth] = React.useState('')
  const [depthUnit, setDepthUnit] = React.useState<Unit>(defaultUnit)

  const defaultDensityUnit = useDefaultDensityUnit()

  const [specificWeight, setSpecificWeight] = React.useState('')
  const [specificWeightUnit, setSpecificWeightUnit] =
    React.useState<DensityUnit>(defaultDensityUnit)

  const volume = React.useMemo(() => {
    if (!width) return 0
    if (!height) return 0
    if (!depth) return 0

    const widthValue = Number(width.replace(',', '.'))
    const heightValue = Number(height.replace(',', '.'))
    const depthValue = Number(depth.replace(',', '.'))

    if (Number.isNaN(widthValue)) return 0

    let widthM: number
    let heightM: number
    let depthM: number

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

    switch (depthUnit) {
      case 'cm':
        depthM = cmToM(depthValue)
        break
      case 'm':
        depthM = depthValue
        break
      case 'mm':
        depthM = mmToM(depthValue)
        break
    }

    return (widthM * depthM * heightM) / 3
  }, [depth, depthUnit, height, heightUnit, width, widthUnit])

  const weight = useWeight(specificWeight, specificWeightUnit, volume)

  return (
    <Form>
      <View style={styles.figure}>
        <Pyramid size={120} />
      </View>

      <Section style={{ marginTop: 16 }}>
        <UnitInput
          type="unit"
          label="Altura"
          value={height}
          onChangeText={setHeight}
          unitValue={heightUnit}
          onChangeUnit={setHeightUnit}
          placeholder="0"
        />

        <UnitInput
          type="unit"
          label="Largura da base"
          value={width}
          onChangeText={setWidth}
          unitValue={widthUnit}
          onChangeUnit={setWidthUnit}
          placeholder="0"
        />

        <UnitInput
          type="unit"
          label="Profundidade da base"
          value={depth}
          onChangeText={setDepth}
          unitValue={depthUnit}
          onChangeUnit={setDepthUnit}
          placeholder="0"
          isLast
        />
      </Section>

      <VolumeTip volume={volume} style={styles.tip} />

      <Section
        disabled={!Number(width) || !Number(depth) || !Number(height)}
        style={{ marginTop: 16 }}
      >
        <UnitInput
          type="density-unit"
          label="Peso específico"
          value={specificWeight}
          onChangeText={setSpecificWeight}
          editable={!!(Number(width) && Number(height) && Number(depth))}
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
  figure: {
    alignItems: 'center'
  },
  tip: {
    marginTop: 16,
    marginBottom: 32
  }
})
