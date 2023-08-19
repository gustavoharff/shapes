import * as React from 'react'
import { StyleSheet, View } from 'react-native'

import { useDefaultDensityUnit, useDefaultUnit, useWeight } from '@/hooks'
import { t } from '@/i18n'
import { ConeTrunk, Form, Section, UnitInput, VolumeTip, WeightTip } from '@/components/ui'
import { convertStringToNumber, convertUnits } from '@/utils'

export function ConeTrunkFormScreen() {
  const defaultUnit = useDefaultUnit()

  const [minorRadius, setMinorRadius] = React.useState('')
  const [minorRadiusUnit, setMinorRadiusUnit] = React.useState(defaultUnit)

  const [greaterRadius, setGreaterRadius] = React.useState('')
  const [greaterRadiusUnit, setGreaterRadiusUnit] = React.useState(defaultUnit)

  const [height, setHeight] = React.useState('')
  const [heightUnit, setHeightUnit] = React.useState(defaultUnit)

  const defaultDensityUnit = useDefaultDensityUnit()

  const [specificWeight, setSpecificWeight] = React.useState('')
  const [specificWeightUnit, setSpecificWeightUnit] =
    React.useState(defaultDensityUnit)

  // m3
  const volume = React.useMemo(() => {
    const [minorRadiusValue, greaterRadiusValue, heightValue] =
      convertStringToNumber(minorRadius, greaterRadius, height)

    const [minorRadiusM, greaterRadiusM, heightM] = convertUnits(
      'm',
      { value: minorRadiusValue, unit: minorRadiusUnit },
      { value: greaterRadiusValue, unit: greaterRadiusUnit },
      { value: heightValue, unit: heightUnit }
    )

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
          label={t('fields.minor-radius')}
          value={minorRadius}
          onChangeText={setMinorRadius}
          unitValue={minorRadiusUnit}
          onChangeUnit={setMinorRadiusUnit}
          placeholder="0"
        />

        <UnitInput
          type="unit"
          label={t('fields.greater-radius')}
          value={greaterRadius}
          onChangeText={setGreaterRadius}
          unitValue={greaterRadiusUnit}
          onChangeUnit={setGreaterRadiusUnit}
          placeholder="0"
        />

        <UnitInput
          type="unit"
          label={t('fields.height')}
          value={height}
          onChangeText={setHeight}
          unitValue={heightUnit}
          onChangeUnit={setHeightUnit}
          placeholder="0"
        />
      </Section>

      <VolumeTip volume={volume} style={styles.tip} />

      <Section
        disabled={!Number(minorRadius) || !Number(height)}
        style={{ marginTop: 16 }}
      >
        <UnitInput
          type="density-unit"
          label={t('fields.specific-weight')}
          value={specificWeight}
          onChangeText={setSpecificWeight}
          editable={!!(Number(minorRadius) && Number(height))}
          unitValue={specificWeightUnit}
          onChangeUnit={setSpecificWeightUnit}
          placeholder="0"
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
