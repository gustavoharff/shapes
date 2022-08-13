import * as React from 'react'
import { StyleSheet, Text } from 'react-native'

import { kgm3ToKgcm3, kgm3ToKgL, kgm3ToKgmm3 } from '../utils/density-unit'
import { DEFAULT_UNIT_FORMAT } from '../utils/format-default-options'
import { Tip } from './tip'

interface WeightTipProps {
  weight: number
}

export function WeightTip(props: WeightTipProps) {
  const { weight } = props

  return (
    <Tip title="Peso" style={{ marginTop: 16 }}>
      <Text style={styles.value} numberOfLines={1}>
        • {kgm3ToKgL(weight).toLocaleString('pt-BR', DEFAULT_UNIT_FORMAT)} kg/l
      </Text>

      <Text style={styles.value} numberOfLines={1}>
        • {weight.toLocaleString('pt-BR', DEFAULT_UNIT_FORMAT)} kg/m³
      </Text>

      <Text style={styles.value} numberOfLines={1}>
        • {kgm3ToKgcm3(weight).toLocaleString('pt-BR', DEFAULT_UNIT_FORMAT)}{' '}
        kg/cm³
      </Text>

      <Text style={styles.value} numberOfLines={1}>
        • {kgm3ToKgmm3(weight).toLocaleString('pt-BR', DEFAULT_UNIT_FORMAT)}{' '}
        kg/mm³
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
