import * as React from 'react'
import { StyleSheet, View } from 'react-native'

import { useDefaultDensityUnit, useDefaultUnit, useWeight } from '@/hooks'
import { t } from '@/i18n'
import { Cube, Form, Section, UnitInput, VolumeTip, WeightTip } from '@/components/ui'
import { convertStringToNumber, convertUnits } from '@/utils'

export function CubeFormScreen() {
  const defaultUnit = useDefaultUnit()

  const [edge, setEdge] = React.useState('')
  const [edgeUnit, setEdgeUnit] = React.useState(defaultUnit)

  const defaultDensityUnit = useDefaultDensityUnit()

  const [specificWeight, setSpecificWeight] = React.useState('')
  const [specificWeightUnit, setSpecificWeightUnit] =
    React.useState(defaultDensityUnit)

  // m
  const volume = React.useMemo(() => {
    const [edgeValue] = convertStringToNumber(edge)

    const [edgeM] = convertUnits('m', { value: edgeValue, unit: edgeUnit })

    return edgeM ** 3
  }, [edge, edgeUnit])

  const weight = useWeight(specificWeight, specificWeightUnit, volume)

  return (
    <Form>
      <View style={styles.cube}>
        <Cube size={120} />
      </View>

      <Section style={{ marginTop: 16 }}>
        <UnitInput
          type="unit"
          label={t('fields.edge')}
          value={edge}
          onChangeText={setEdge}
          unitValue={edgeUnit}
          onChangeUnit={setEdgeUnit}
          placeholder="0"
        />
      </Section>

      <VolumeTip volume={volume} style={styles.tip} />

      <Section disabled={Number(edge) <= 0} style={{ marginTop: 16 }}>
        <UnitInput
          type="density-unit"
          label={t('fields.specific-weight')}
          value={specificWeight}
          onChangeText={setSpecificWeight}
          editable={Number(edge) > 0}
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
