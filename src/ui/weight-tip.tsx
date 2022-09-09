import * as React from 'react'
import { StyleProp, StyleSheet, Text, ViewStyle } from 'react-native'

import { useDensityUnits } from '../hooks'
import { kgm3ToKgcm3, kgm3ToKgL, kgm3ToKgmm3 } from '../utils/density-unit'
import { DEFAULT_UNIT_FORMAT } from '../utils/format-default-options'
import { Tip } from './tip'

interface WeightTipProps {
  readonly weight: number
  readonly style?: StyleProp<ViewStyle>
}

export function WeightTip(props: WeightTipProps) {
  const { weight, style } = props

  const densityUnits = useDensityUnits()

  return (
    <Tip title="Peso" style={style}>
      {densityUnits.find(unit => unit.name === 'kg/l')?.selected && (
        <Text style={styles.value} numberOfLines={1}>
          • {kgm3ToKgL(weight).toLocaleString('pt-BR', DEFAULT_UNIT_FORMAT)}{' '}
          kg/l
        </Text>
      )}

      {densityUnits.find(unit => unit.name === 'kg/m³')?.selected && (
        <Text style={styles.value} numberOfLines={1}>
          • {weight.toLocaleString('pt-BR', DEFAULT_UNIT_FORMAT)} kg/m³
        </Text>
      )}

      {densityUnits.find(unit => unit.name === 'kg/cm³')?.selected && (
        <Text style={styles.value} numberOfLines={1}>
          • {kgm3ToKgcm3(weight).toLocaleString('pt-BR', DEFAULT_UNIT_FORMAT)}{' '}
          kg/cm³
        </Text>
      )}

      {densityUnits.find(unit => unit.name === 'kg/mm³')?.selected && (
        <Text style={styles.value} numberOfLines={1}>
          • {kgm3ToKgmm3(weight).toLocaleString('pt-BR', DEFAULT_UNIT_FORMAT)}{' '}
          kg/mm³
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
