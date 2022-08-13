import * as React from 'react'
import { StyleSheet, View } from 'react-native'

import { useWeight } from '../hooks'
import { RootStackScreenProps } from '../navigation/types'
import { DensityUnit, Unit } from '../types/unit'
import { Cube, Form, WeightTip, VolumeTip } from '../ui'
import { UnitInput } from '../ui/unit-input'
import { cmToM, mmToM } from '../utils'

type CubeFormProps = RootStackScreenProps<'CubeForm'>

export function CubeFormScreen({ navigation }: CubeFormProps) {
  const [edge, setEdge] = React.useState('')
  const [edgeUnit, setEdgeUnit] = React.useState<Unit>('m')

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

  const [specificWeight, setSpecificWeight] = React.useState('')
  const [specificWeightUnit, setSpecificWeightUnit] =
    React.useState<DensityUnit>('kg/m³')

  const weight = useWeight(specificWeight, specificWeightUnit, volume)

  return (
    <Form>
      <View style={styles.cube}>
        <Cube size={120} />
      </View>

      <UnitInput
        placeholder="Aresta"
        value={edge}
        onChangeText={setEdge}
        unitValue={edgeUnit}
        onUnitPress={() => {
          navigation.navigate('SelectUnit', {
            unit: edgeUnit,
            onSelect: value => setEdgeUnit(value)
          })
        }}
      />

      <VolumeTip volume={volume} />

      <UnitInput
        placeholder="Peso especifico"
        value={specificWeight}
        onChangeText={setSpecificWeight}
        editable={!!edge}
        unitValue={specificWeightUnit}
        onUnitPress={() => {
          navigation.navigate('SelectDensityUnit', {
            unit: specificWeightUnit,
            onSelect: value => setSpecificWeightUnit(value)
          })
        }}
        containerStyles={{ marginTop: 16 }}
      />

      <WeightTip weight={weight} />
    </Form>
  )
}

const styles = StyleSheet.create({
  cube: {
    alignItems: 'center'
  }
})
