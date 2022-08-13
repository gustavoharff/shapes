import * as React from 'react'
import { StyleSheet, View } from 'react-native'

import { RootStackScreenProps } from '../navigation/types'
import { DensityUnit, Unit } from '../types/unit'
import { Cube, Input, Form, WeightTip, VolumeTip } from '../ui'
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

  const edgeRef = React.useRef<Input>(null)

  React.useEffect(() => {
    edgeRef.current?.focus()
  }, [])

  // kg/m3
  const weight = React.useMemo(() => {
    if (!edge) return 0

    if (!specificWeight) return 0

    const value = Number(specificWeight.replace(',', '.'))

    if (Number.isNaN(value)) return 0

    let valueKgM3: number

    switch (specificWeightUnit) {
      case 'kg/m³': {
        valueKgM3 = value
      }
    }

    return valueKgM3 * volume
  }, [edge, specificWeight, specificWeightUnit, volume])

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
