import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { RootStackScreenProps } from '../navigation/types'
import { DensityUnit, Unit } from '../types/unit'
import { Cylinder, Form, Tip } from '../ui'
import { UnitInput } from '../ui/unit-input'
import { cmToM, m3ToCm3, m3ToMm3, mmToM } from '../utils'

type CylinderFormProps = RootStackScreenProps<'CylinderForm'>

export function CylinderFormScreen(props: CylinderFormProps) {
  const { navigation } = props

  const [radius, setRadius] = React.useState('')
  const [radiusUnit, setRadiusUnit] = React.useState<Unit>('cm')

  const [height, setHeight] = React.useState('')
  const [heightUnit, setHeightUnit] = React.useState<Unit>('cm')

  const [specificWeight, setSpecificWeight] = React.useState('')
  const [specificWeightUnit, setSpecificWeightUnit] =
    React.useState<DensityUnit>('kg/m³')

  const volume = React.useMemo(() => {
    if (!radius) return 0
    if (!height) return 0

    const radiusParsed = Number(radius.replace(',', '.'))
    const heightParsed = Number(height.replace(',', '.'))

    if (Number.isNaN(radiusParsed)) return 0
    if (Number.isNaN(heightParsed)) return 0

    let radiusM: number
    let heightM: number

    switch (radiusUnit) {
      case 'cm': {
        radiusM = cmToM(radiusParsed)
        break
      }
      case 'm': {
        radiusM = radiusParsed
        break
      }
      case 'mm': {
        radiusM = mmToM(radiusParsed)
        break
      }
    }

    switch (heightUnit) {
      case 'cm': {
        heightM = cmToM(heightParsed)
        break
      }
      case 'm': {
        heightM = heightParsed
        break
      }
      case 'mm': {
        heightM = mmToM(heightParsed)
        break
      }
    }

    return Math.PI * radiusM ** 2 * heightM
  }, [height, heightUnit, radius, radiusUnit])

  // kg/m3
  const weight = React.useMemo(() => {
    if (!volume) return 0
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
  }, [specificWeight, specificWeightUnit, volume])

  return (
    <Form>
      <View style={styles.figure}>
        <Cylinder size={120} />
      </View>

      <UnitInput
        placeholder="Raio da base"
        value={radius}
        onChangeText={setRadius}
        unitValue={radiusUnit}
        onUnitPress={() => {
          navigation.navigate('SelectUnit', {
            unit: radiusUnit,
            onSelect: value => setRadiusUnit(value)
          })
        }}
      />

      <UnitInput
        placeholder="Altura"
        value={height}
        onChangeText={setHeight}
        unitValue={heightUnit}
        onUnitPress={() => {
          navigation.navigate('SelectUnit', {
            unit: heightUnit,
            onSelect: value => setHeightUnit(value)
          })
        }}
        containerStyles={{ marginTop: 16 }}
      />

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

      <UnitInput
        placeholder="Peso especifico"
        value={specificWeight}
        onChangeText={setSpecificWeight}
        editable={!!radius && !!height}
        unitValue={specificWeightUnit}
        onUnitPress={() => {
          navigation.navigate('SelectDensityUnit', {
            unit: specificWeightUnit,
            onSelect: value => setSpecificWeightUnit(value)
          })
        }}
        containerStyles={{ marginTop: 16 }}
      />

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
  figure: {
    alignItems: 'center'
  },
  tipValue: {
    color: '#ebeaea',
    fontSize: 16,
    fontWeight: '600'
  }
})
