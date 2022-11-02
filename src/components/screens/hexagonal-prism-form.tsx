import * as React from 'react'
import { StyleSheet, View } from 'react-native'

import { useDefaultDensityUnit, useDefaultUnit, useWeight } from 'hooks'
import { t } from 'i18n'
import {
  Form,
  HexagonalPrism,
  Section,
  UnitInput,
  VolumeTip,
  WeightTip
} from 'ui'
import { convertStringToNumber, convertUnits } from 'utils'

export function HexagonalPrismFormScreen() {
  const defaultUnit = useDefaultUnit()

  const [width, setWidth] = React.useState('')
  const [widthUnit, setWidthUnit] = React.useState(defaultUnit)

  const [height, setHeight] = React.useState('')
  const [heightUnit, setHeightUnit] = React.useState(defaultUnit)

  const defaultDensityUnit = useDefaultDensityUnit()

  const [specificWeight, setSpecificWeight] = React.useState('')
  const [specificWeightUnit, setSpecificWeightUnit] =
    React.useState(defaultDensityUnit)

  // m
  const volume = React.useMemo(() => {
    const [widthValue, heightValue] = convertStringToNumber(width, height)

    const [widthM, heightM] = convertUnits(
      'm',
      { value: widthValue, unit: widthUnit },
      { value: heightValue, unit: heightUnit }
    )

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
          label={t('fields.width')}
          value={width}
          onChangeText={setWidth}
          unitValue={widthUnit}
          onChangeUnit={setWidthUnit}
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

      <Section disabled={!Number(height)} style={{ marginTop: 16 }}>
        <UnitInput
          type="density-unit"
          label={t('fields.specific-weight')}
          value={specificWeight}
          onChangeText={setSpecificWeight}
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
  cube: {
    alignItems: 'center'
  },
  tip: {
    marginTop: 16,
    marginBottom: 32
  }
})
