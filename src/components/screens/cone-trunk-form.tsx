import * as React from 'react'
import { StyleSheet, View } from 'react-native'

import { useDefaultDensityUnit, useDefaultUnit, useWeight } from 'hooks'
import { DensityUnit, Unit } from 'types'
import { ConeTrunk, Form, Section, UnitInput, VolumeTip, WeightTip } from 'ui'
import { cmToM, mmToM } from 'utils'

export function ConeTrunkFormScreen() {
  const defaultUnit = useDefaultUnit()

  const [minorRadius, setMinorRadius] = React.useState('')
  const [minorRadiusUnit, setMinorRadiusUnit] =
    React.useState<Unit>(defaultUnit)
  const [greaterRadius, setGreaterRadius] = React.useState('')
  const [greaterRadiusUnit, setGreaterRadiusUnit] =
    React.useState<Unit>(defaultUnit)
  const [height, setHeight] = React.useState('')
  const [heightUnit, setHeightUnit] = React.useState<Unit>(defaultUnit)

  const defaultDensityUnit = useDefaultDensityUnit()

  const [specificWeight, setSpecificWeight] = React.useState('')
  const [specificWeightUnit, setSpecificWeightUnit] =
    React.useState<DensityUnit>(defaultDensityUnit)

  // m3
  const volume = React.useMemo(() => {
    if (!height) return 0

    const minorRadiusParsed = Number(minorRadius.replace(',', '.'))
    const greaterRadiusParsed = Number(greaterRadius.replace(',', '.'))
    const heightParsed = Number(height.replace(',', '.'))

    if (Number.isNaN(minorRadiusParsed)) return 0
    if (Number.isNaN(greaterRadiusParsed)) return 0
    if (Number.isNaN(heightParsed)) return 0

    let minorRadiusM: number
    let greaterRadiusM: number
    let heightM: number

    switch (minorRadiusUnit) {
      case 'cm': {
        minorRadiusM = cmToM(minorRadiusParsed)
        break
      }
      case 'm': {
        minorRadiusM = minorRadiusParsed
        break
      }
      case 'mm': {
        minorRadiusM = mmToM(minorRadiusParsed)
        break
      }
    }

    switch (greaterRadiusUnit) {
      case 'cm': {
        greaterRadiusM = cmToM(greaterRadiusParsed)
        break
      }
      case 'm': {
        greaterRadiusM = greaterRadiusParsed
        break
      }
      case 'mm': {
        greaterRadiusM = mmToM(greaterRadiusParsed)
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

    return getVolume(heightM, greaterRadiusM, minorRadiusM)
  }, [
    greaterRadius,
    greaterRadiusUnit,
    height,
    heightUnit,
    minorRadius,
    minorRadiusUnit
  ])

  const weight = useWeight(specificWeight, specificWeightUnit, volume)

  return (
    <Form>
      <View style={styles.figure}>
        <ConeTrunk size={120} />
      </View>

      <Section style={{ marginTop: 16 }}>
        <UnitInput
          type="unit"
          label="Raio menor"
          value={minorRadius}
          onChangeText={setMinorRadius}
          unitValue={minorRadiusUnit}
          onChangeUnit={setMinorRadiusUnit}
          placeholder="0"
        />

        <UnitInput
          type="unit"
          label="Raio maior"
          value={greaterRadius}
          onChangeText={setGreaterRadius}
          unitValue={greaterRadiusUnit}
          onChangeUnit={setGreaterRadiusUnit}
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
          isLast
        />
      </Section>

      <VolumeTip volume={volume} style={styles.tip} />

      <Section
        disabled={!Number(minorRadius) || !Number(height)}
        style={{ marginTop: 16 }}
      >
        <UnitInput
          type="density-unit"
          label="Peso específico"
          value={specificWeight}
          onChangeText={setSpecificWeight}
          editable={!!(Number(minorRadius) && Number(height))}
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

function getVolume(altura: number, raioMaior: number, raioMenor: number) {
  return (
    ((altura * Math.PI) / 3) *
    (raioMaior ** 2 + raioMaior * raioMenor + raioMenor ** 2)
  )
}
