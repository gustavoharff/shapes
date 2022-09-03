import * as React from 'react'
import { StyleSheet, View } from 'react-native'

import { Unit } from '../types/unit'
import { Form, Pyramid, UnitInput, VolumeTip } from '../ui'
import { cmToM, mmToM } from '../utils'

export function PyramidFormScreen() {
  const [height, setHeight] = React.useState('')
  const [heightUnit, setHeightUnit] = React.useState<Unit>('cm')

  const [width, setWidth] = React.useState('')
  const [widthUnit, setWidthUnit] = React.useState<Unit>('cm')

  const [depth, setDepth] = React.useState('')
  const [depthUnit, setDepthUnit] = React.useState<Unit>('cm')

  const volume = React.useMemo(() => {
    if (!width) return 0
    if (!height) return 0
    if (!depth) return 0

    const widthValue = Number(width.replace(',', '.'))
    const heightValue = Number(height.replace(',', '.'))
    const depthValue = Number(depth.replace(',', '.'))

    if (Number.isNaN(widthValue)) return 0

    let widthM: number
    let heightM: number
    let depthM: number

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

    switch (depthUnit) {
      case 'cm':
        depthM = cmToM(depthValue)
        break
      case 'm':
        depthM = depthValue
        break
      case 'mm':
        depthM = mmToM(depthValue)
        break
    }

    return (widthM * depthM * heightM) / 3
  }, [depth, depthUnit, height, heightUnit, width, widthUnit])

  return (
    <Form>
      <View style={styles.figure}>
        <Pyramid size={120} />
      </View>

      <UnitInput
        type="unit"
        placeholder="Altura"
        value={height}
        onChangeText={setHeight}
        unitValue={heightUnit}
        onChangeUnit={setHeightUnit}
      />

      <UnitInput
        type="unit"
        placeholder="Largura da base"
        value={width}
        onChangeText={setWidth}
        unitValue={widthUnit}
        onChangeUnit={setWidthUnit}
        containerStyles={{ marginTop: 16 }}
      />

      <UnitInput
        type="unit"
        placeholder="Profundidade da base"
        value={depth}
        onChangeText={setDepth}
        unitValue={depthUnit}
        onChangeUnit={setDepthUnit}
        containerStyles={{ marginTop: 16 }}
      />

      <VolumeTip volume={volume} />
    </Form>
  )
}

const styles = StyleSheet.create({
  figure: {
    alignItems: 'center'
  }
})