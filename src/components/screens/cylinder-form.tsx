import * as React from 'react'
import { StyleSheet, View } from 'react-native'

import { useDefaultDensityUnit, useDefaultUnit, useWeight } from 'hooks'
import { t } from 'i18n'
import { Cylinder, Form, Section, UnitInput, VolumeTip, WeightTip } from 'ui'
import { convertStringToNumber, convertUnits } from 'utils'

export function CylinderFormScreen() {
  const defaultUnit = useDefaultUnit()

  const [radius, setRadius] = React.useState('')
  const [radiusUnit, setRadiusUnit] = React.useState(defaultUnit)

  const [height, setHeight] = React.useState('')
  const [heightUnit, setHeightUnit] = React.useState(defaultUnit)

  const defaultDensityUnit = useDefaultDensityUnit()

  const [specificWeight, setSpecificWeight] = React.useState('')
  const [specificWeightUnit, setSpecificWeightUnit] =
    React.useState(defaultDensityUnit)

  const volume = React.useMemo(() => {
    const [radiusParsed, heightParsed] = convertStringToNumber(radius, height)

    const [radiusM, heightM] = convertUnits(
      'm',
      { value: radiusParsed, unit: radiusUnit },
      { value: heightParsed, unit: heightUnit }
    )

    return Math.PI * radiusM ** 2 * heightM
  }, [height, heightUnit, radius, radiusUnit])

  const weight = useWeight(specificWeight, specificWeightUnit, volume)

  return (
    <Form>
      <View style={styles.figure}>
        <Cylinder size={120} />
      </View>

      <Section style={{ marginTop: 16 }}>
        <UnitInput
          type="unit"
          label={t('fields.radius')}
          value={radius}
          onChangeText={setRadius}
          unitValue={radiusUnit}
          onChangeUnit={setRadiusUnit}
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
        disabled={!Number(radius) || !Number(height)}
        style={{ marginTop: 16 }}
      >
        <UnitInput
          type="density-unit"
          label={t('fields.specific-weight')}
          value={specificWeight}
          onChangeText={setSpecificWeight}
          editable={!!(Number(radius) && Number(height))}
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
