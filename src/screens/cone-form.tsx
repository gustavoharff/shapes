import { useTheme } from '@react-navigation/native'
import * as React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'

import { RootStackScreenProps } from '../navigation/types'
import { DensityUnit, Unit } from '../types/unit'
import { Cone, Form, Input, Tip } from '../ui'
import { cmToM, m3ToCm3, m3ToMm3, mmToM } from '../utils'

type CubeFormProps = RootStackScreenProps<'ConeForm'>

export function ConeFormScreen({ navigation }: CubeFormProps) {
  const [radius, setRadius] = React.useState('')
  const [radiusUnit, setRadiusUnit] = React.useState<Unit>('m')
  const [height, setHeight] = React.useState('')
  const [heightUnit, setHeightUnit] = React.useState<Unit>('m')

  const [specificWeight, setSpecificWeight] = React.useState('')
  const [specificWeightUnit, setSpecificWeightUnit] =
    React.useState<DensityUnit>('kg/m³')

  // m3
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

    return (Math.PI * radiusM ** 2 * heightM) / 3
  }, [height, heightUnit, radius, radiusUnit])

  const theme = useTheme()

  // kg/m3
  const weight = React.useMemo(() => {
    if (!height) return 0
    if (!radius) return 0

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
  }, [height, radius, specificWeight, specificWeightUnit, volume])

  return (
    <Form>
      <View style={styles.figure}>
        <Cone size={120} />
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Input
          placeholder="Aresta"
          value={radius}
          onChangeText={setRadius}
          keyboardType="numeric"
          style={{ flex: 1 }}
        />
        <Button
          title={radiusUnit}
          color={theme.colors.primary}
          onPress={() => {
            navigation.navigate('SelectUnit', {
              unit: radiusUnit,
              onSelect: value => setRadiusUnit(value)
            })
          }}
        />
      </View>

      <View
        style={{ flexDirection: 'row', alignItems: 'center', marginTop: 16 }}
      >
        <Input
          placeholder="Altura"
          value={height}
          onChangeText={setHeight}
          keyboardType="numeric"
          style={{ flex: 1 }}
        />
        <Button
          title={heightUnit}
          color={theme.colors.primary}
          onPress={() => {
            navigation.navigate('SelectUnit', {
              unit: heightUnit,
              onSelect: value => setHeightUnit(value)
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
          editable={!!radius && !!height}
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
  figure: {
    alignItems: 'center'
  },
  tipValue: {
    color: '#ebeaea',
    fontSize: 16,
    fontWeight: '600'
  }
})
