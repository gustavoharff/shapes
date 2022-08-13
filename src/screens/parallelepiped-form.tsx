import * as React from 'react'
import { StyleSheet, View } from 'react-native'

import { RootStackScreenProps } from '../navigation/types'
import { DensityUnit, Unit } from '../types/unit'
import { Parallelepiped, Form, VolumeTip, WeightTip } from '../ui'
import { UnitInput } from '../ui/unit-input'
import { cmToM, mmToM } from '../utils'

type ParallelepipedFormProps = RootStackScreenProps<'ParallelepipedForm'>

export function ParallelepipedFormScreen({
  navigation
}: ParallelepipedFormProps) {
  const [width, setWidth] = React.useState('')
  const [widthUnit, setWidthUnit] = React.useState<Unit>('cm')

  const [height, setHeight] = React.useState('')
  const [heightUnit, setHeightUnit] = React.useState<Unit>('cm')

  const [greeting, setGreeting] = React.useState('')
  const [greetingUnit, setGreetingUnit] = React.useState<Unit>('cm')

  const [specificWeight, setSpecificWeight] = React.useState('')
  const [specificWeightUnit, setSpecificWeightUnit] =
    React.useState<DensityUnit>('kg/m³')

  // m
  const volume = React.useMemo(() => {
    if (!width) return 0
    if (!height) return 0
    if (!greeting) return 0

    const widthValue = Number(width.replace(',', '.'))
    const heightValue = Number(height.replace(',', '.'))
    const greetingValue = Number(greeting.replace(',', '.'))

    if (Number.isNaN(widthValue)) return 0

    let widthM: number
    let heightM: number
    let greetingM: number

    switch (widthUnit) {
      case 'cm':
        widthM = cmToM(widthValue)
        break
      case 'm':
        widthM = widthValue
        break
      case 'mm':
        widthM = mmToM(widthValue)
        break
    }

    switch (heightUnit) {
      case 'cm':
        heightM = cmToM(heightValue)
        break
      case 'm':
        heightM = heightValue
        break
      case 'mm':
        heightM = mmToM(heightValue)
        break
    }

    switch (greetingUnit) {
      case 'cm':
        greetingM = cmToM(greetingValue)
        break
      case 'm':
        greetingM = greetingValue
        break
      case 'mm':
        greetingM = mmToM(greetingValue)
        break
    }

    return widthM * heightM * greetingM
  }, [greeting, greetingUnit, height, heightUnit, width, widthUnit])

  // kg/m3
  const weight = React.useMemo(() => {
    if (!width) return 0
    if (!height) return 0
    if (!greeting) return 0

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
  }, [greeting, height, specificWeight, specificWeightUnit, volume, width])

  return (
    <Form>
      <View style={styles.cube}>
        <Parallelepiped size={120} />
      </View>

      <UnitInput
        placeholder="Largura"
        value={width}
        onChangeText={setWidth}
        unitValue={widthUnit}
        onUnitPress={() => {
          navigation.navigate('SelectUnit', {
            unit: widthUnit,
            onSelect: value => setWidthUnit(value)
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

      <UnitInput
        placeholder="Cumprimento"
        value={greeting}
        onChangeText={setGreeting}
        unitValue={greetingUnit}
        onUnitPress={() => {
          navigation.navigate('SelectUnit', {
            unit: greetingUnit,
            onSelect: value => setGreetingUnit(value)
          })
        }}
        containerStyles={{ marginTop: 16 }}
      />

      <VolumeTip volume={volume} />

      <UnitInput
        placeholder="Peso especifico"
        value={specificWeight}
        onChangeText={setSpecificWeight}
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
