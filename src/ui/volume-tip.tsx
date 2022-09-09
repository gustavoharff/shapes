import * as React from 'react'
import { StyleProp, StyleSheet, Text, ViewStyle } from 'react-native'

import { useVolumeUnits } from '../hooks'
import { m3ToCm3, m3ToL, m3ToMm3 } from '../utils'
import { DEFAULT_UNIT_FORMAT } from '../utils/format-default-options'
import { Tip } from './tip'

interface VolumeTipProps {
  readonly volume: number
  readonly style?: StyleProp<ViewStyle>
}

export function VolumeTip(props: VolumeTipProps) {
  const { volume, style } = props

  const volumeUnits = useVolumeUnits()

  return (
    <Tip title="Volume" style={style}>
      {volumeUnits.find(unit => unit.name === 'l')?.selected && (
        <Text style={styles.value} numberOfLines={1}>
          • {m3ToL(volume).toLocaleString('pt-BR', DEFAULT_UNIT_FORMAT)} litros
        </Text>
      )}

      {volumeUnits.find(unit => unit.name === 'm³')?.selected && (
        <Text style={styles.value} numberOfLines={1}>
          • {volume.toLocaleString('pt-BR', DEFAULT_UNIT_FORMAT)} m³
        </Text>
      )}

      {volumeUnits.find(unit => unit.name === 'cm³')?.selected && (
        <Text style={styles.value} numberOfLines={1}>
          • {m3ToCm3(volume).toLocaleString('pt-BR', DEFAULT_UNIT_FORMAT)} cm³
        </Text>
      )}

      {volumeUnits.find(unit => unit.name === 'mm³')?.selected && (
        <Text style={styles.value} numberOfLines={1}>
          • {m3ToMm3(volume).toLocaleString('pt-BR', DEFAULT_UNIT_FORMAT)} mm³
        </Text>
      )}
    </Tip>
  )
}

const styles = StyleSheet.create({
  value: {
    color: '#ebeaea',
    fontSize: 16,
    fontWeight: '600'
  }
})
