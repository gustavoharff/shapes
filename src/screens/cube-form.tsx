import { NativeStackScreenProps } from '@react-navigation/native-stack'
import * as React from 'react'
import { StyleSheet, View } from 'react-native'

import { useDefaultDensityUnit, useDefaultUnit, useWeight } from '../hooks'
import { RootStackParamList } from '../navigation/types'
import { DensityUnit, Unit } from '../types/unit'
import {
  Cube,
  Form,
  HeaderIconButton,
  Section,
  UnitInput,
  VolumeTip,
  WeightTip
} from '../ui'
import { cmToM, mmToM } from '../utils'

type CubeFormScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'ConeForm'
>

export function CubeFormScreen(props: CubeFormScreenProps) {
  const { navigation } = props

  const defaultUnit = useDefaultUnit()

  const [edge, setEdge] = React.useState('')
  const [edgeUnit, setEdgeUnit] = React.useState<Unit>(defaultUnit)

  const defaultDensityUnit = useDefaultDensityUnit()

  const [specificWeight, setSpecificWeight] = React.useState('')
  const [specificWeightUnit, setSpecificWeightUnit] =
    React.useState<DensityUnit>(defaultDensityUnit)

  // m
  const volume = React.useMemo(() => {
    if (!edge) return 0

    const value = Number(edge.replace(',', '.'))

    if (Number.isNaN(value)) return 0

    let valueM: number

    switch (edgeUnit) {
      case 'cm':
        valueM = cmToM(value)
        break
      case 'm':
        valueM = value
        break
      case 'mm':
        valueM = mmToM(value)
        break
    }

    return valueM ** 3
  }, [edge, edgeUnit])

  const weight = useWeight(specificWeight, specificWeightUnit, volume)

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderIconButton
          name="information-outline"
          onPress={() => navigation.navigate('CubeInformation')}
        />
      )
    })
  }, [navigation])

  return (
    <Form>
      <View style={styles.cube}>
        <Cube size={120} />
      </View>

      <Section style={{ marginTop: 16 }}>
        <UnitInput
          type="unit"
          label="Aresta"
          value={edge}
          onChangeText={setEdge}
          unitValue={edgeUnit}
          onChangeUnit={setEdgeUnit}
          isLast
        />
      </Section>

      <VolumeTip volume={volume} style={styles.tip} />

      <Section disabled={!edge} style={{ marginTop: 16 }}>
        <UnitInput
          type="density-unit"
          label="Peso específico"
          value={specificWeight}
          onChangeText={setSpecificWeight}
          editable={!!edge}
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
  cube: {
    alignItems: 'center'
  },
  tip: {
    marginTop: 16,
    marginBottom: 32
  }
})
