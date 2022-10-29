import * as React from 'react'
import { StyleSheet, View } from 'react-native'

import { useDefaultDensityUnit, useDefaultUnit, useWeight } from 'hooks'
import { t } from 'i18n'
import {
  Form,
  Parallelepiped,
  Section,
  UnitInput,
  VolumeTip,
  WeightTip
} from 'ui'
import { convertStringToNumber, convertUnits } from 'utils'

export function ParallelepipedFormScreen() {
  const defaultUnit = useDefaultUnit()

  const [width, setWidth] = React.useState('')
  const [widthUnit, setWidthUnit] = React.useState(defaultUnit)

  const [height, setHeight] = React.useState('')
  const [heightUnit, setHeightUnit] = React.useState(defaultUnit)

  const [length, setLength] = React.useState('')
  const [lengthUnit, setLengthUnit] = React.useState(defaultUnit)

  const defaultDensityUnit = useDefaultDensityUnit()

  const [specificWeight, setSpecificWeight] = React.useState('')
  const [specificWeightUnit, setSpecificWeightUnit] =
    React.useState(defaultDensityUnit)

  // m
  const volume = React.useMemo(() => {
    const [widthValue, heightValue, lengthValue] = convertStringToNumber(
      width,
      height,
      length
    )

    const [widthM, heightM, lengthM] = convertUnits(
      'm',
      { value: widthValue, unit: widthUnit },
      { value: heightValue, unit: heightUnit },
      { value: lengthValue, unit: lengthUnit }
    )

    return widthM * heightM * lengthM
  }, [length, lengthUnit, height, heightUnit, width, widthUnit])

  const weight = useWeight(specificWeight, specificWeightUnit, volume)

  return (
    <Form>
      <View style={styles.cube}>
        <Parallelepiped size={120} />
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

        <UnitInput
          type="unit"
          label={t('fields.length')}
          value={length}
          onChangeText={setLength}
          unitValue={lengthUnit}
          onChangeUnit={setLengthUnit}
          placeholder="0"
        />
      </Section>

      <VolumeTip volume={volume} style={styles.tip} />

      <Section
        disabled={!Number(length) || !Number(height)}
        style={{ marginTop: 16 }}
      >
        <UnitInput
          type="density-unit"
          label={t('fields.specific-weight')}
          value={specificWeight}
          onChangeText={setSpecificWeight}
          unitValue={specificWeightUnit}
          onChangeUnit={setSpecificWeightUnit}
          editable={!!(Number(length) && Number(height))}
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
