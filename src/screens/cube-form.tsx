import { useTheme } from '@react-navigation/native'
import * as React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'

import { RootStackScreenProps } from '../navigation/types'
import { DensityUnit, Unit } from '../types/unit'
import { Cube, Input, Form, Tip } from '../ui'
import { cm3ToM3, cm3ToMm3, cmToM, m3ToCm3, m3ToMm3, mmToM } from '../utils'

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

  const theme = useTheme()

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

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Input
          ref={edgeRef}
          placeholder="Aresta"
          value={edge}
          onChangeText={setEdge}
          keyboardType="numeric"
          style={{ flex: 1 }}
        />
        <Button
          title={edgeUnit}
          color={theme.colors.primary}
          onPress={() => {
            navigation.navigate('SelectUnit', {
              unit: edgeUnit,
              onSelect: value => setEdgeUnit(value)
            })
          }}
        />
      </View>

      <Tip title="Volume" style={{ marginTop: 16 }}>
        <Text style={styles.tipValue} numberOfLines={1}>
          •{' '}
          {volume.toLocaleString('pt-BR', {
            maximumFractionDigits: 5,
            maximumSignificantDigits: 5
          })}{' '}
          m³
        </Text>
        <Text style={styles.tipValue} numberOfLines={1}>
          • {m3ToCm3(volume).toLocaleString('pt-BR')} cm³
        </Text>
        <Text style={styles.tipValue} numberOfLines={1}>
          • {m3ToMm3(volume).toLocaleString('pt-BR')} mm³
        </Text>
      </Tip>

      <View
        style={{ flexDirection: 'row', alignItems: 'center', marginTop: 16 }}
      >
        <Input
          placeholder="Peso especifico"
          value={specificWeight}
          onChangeText={setSpecificWeight}
          keyboardType="numeric"
          editable={!!edge}
          style={{ flex: 1 }}
        />

        <Button
          title={specificWeightUnit}
          color={theme.colors.primary}
          onPress={() => {
            navigation.navigate('SelectDensityUnit', {
              unit: specificWeightUnit,
              onSelect: value => setSpecificWeightUnit(value)
            })
          }}
        />
      </View>

      <Tip title="Peso" style={{ marginTop: 16 }}>
        <Text style={styles.tipValue} numberOfLines={1}>
          •{' '}
          {weight.toLocaleString('pt-BR', {
            maximumSignificantDigits: 6
          })}{' '}
          kg/m³
        </Text>
      </Tip>
    </Form>
  )
}

const styles = StyleSheet.create({
  cube: {
    alignItems: 'center'
  },
  tipValue: {
    color: '#ebeaea',
    fontSize: 16,
    fontWeight: '600'
  }
})
