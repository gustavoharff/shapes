import * as React from 'react'
import { StyleSheet, View } from 'react-native'

import { useDefaultDensityUnit, useDefaultUnit, useWeight } from '@/hooks'
import { t } from '@/i18n'
import { Form, Pyramid, Section, UnitInput, VolumeTip, WeightTip } from '@/components/ui'
import { convertStringToNumber, convertUnits } from '@/utils'

export function PyramidFormScreen() {
  const defaultUnit = useDefaultUnit()

  const [height, setHeight] = React.useState('')
  const [heightUnit, setHeightUnit] = React.useState(defaultUnit)

  const [width, setWidth] = React.useState('')
  const [widthUnit, setWidthUnit] = React.useState(defaultUnit)

  const [depth, setDepth] = React.useState('')
  const [depthUnit, setDepthUnit] = React.useState(defaultUnit)

  const defaultDensityUnit = useDefaultDensityUnit()

  const [specificWeight, setSpecificWeight] = React.useState('')
  const [specificWeightUnit, setSpecificWeightUnit] =
    React.useState(defaultDensityUnit)

  const volume = React.useMemo(() => {
    const [widthValue, heightValue, depthValue] = convertStringToNumber(
      width,
      height,
      depth
    )

    const [widthM, heightM, depthM] = convertUnits(
      'm',
      { value: widthValue, unit: widthUnit },
      { value: heightValue, unit: heightUnit },
      { value: depthValue, unit: depthUnit }
    )

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
          label={t('fields.height')}
          value={height}
          onChangeText={setHeight}
          unitValue={heightUnit}
          onChangeUnit={setHeightUnit}
          placeholder="0"
        />

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
          label={t('fields.base-depth')}
          value={depth}
          onChangeText={setDepth}
          unitValue={depthUnit}
          onChangeUnit={setDepthUnit}
          placeholder="0"
        />
      </Section>

      <VolumeTip volume={volume} style={styles.tip} />

      <Section
        disabled={!Number(width) || !Number(depth) || !Number(height)}
        style={{ marginTop: 16 }}
      >
        <UnitInput
          type="density-unit"
          label={t('fields.specific-weight')}
          value={specificWeight}
          onChangeText={setSpecificWeight}
          editable={!!(Number(width) && Number(height) && Number(depth))}
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
