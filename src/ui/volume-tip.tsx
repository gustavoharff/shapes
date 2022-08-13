import * as React from 'react'
import { StyleSheet, Text } from 'react-native'

import { m3ToCm3, m3ToMm3 } from '../utils'
import { DEFAULT_UNIT_FORMAT } from '../utils/format-default-options'
import { Tip } from './tip'

interface VolumeTipProps {
  volume: number
}

export function VolumeTip(props: VolumeTipProps) {
  const { volume } = props

  return (
    <Tip title="Volume" style={{ marginTop: 16 }}>
      <Text style={styles.value} numberOfLines={1}>
        • {volume.toLocaleString('pt-BR', DEFAULT_UNIT_FORMAT)} m³
      </Text>

      <Text style={styles.value} numberOfLines={1}>
        • {m3ToCm3(volume).toLocaleString('pt-BR', DEFAULT_UNIT_FORMAT)} cm³
      </Text>

      <Text style={styles.value} numberOfLines={1}>
        • {m3ToMm3(volume).toLocaleString('pt-BR', DEFAULT_UNIT_FORMAT)} mm³
      </Text>
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
