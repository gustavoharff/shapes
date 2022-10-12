import * as React from 'react'
import { useIntl } from 'react-intl'
import { StyleProp, ViewStyle } from 'react-native'

import { useDensityUnits } from '../hooks'
import { DensityUnit } from '../services/realm'
import { kgm3ToKgcm3, kgm3ToKgL, kgm3ToKgmm3 } from '../utils/density-unit'
import { Section } from './section'

interface WeightTipProps {
  readonly weight: number
  readonly style?: StyleProp<ViewStyle>
}

export function WeightTip(props: WeightTipProps) {
  const { weight, style } = props

  const densityUnits = useDensityUnits()

  const intl = useIntl()

  const visibleDensityUnits = densityUnits.filter(unit => unit.visible)

  function renderText(unit: DensityUnit) {
    let value: number

    switch (unit.name) {
      case 'kg/cm³':
        value = kgm3ToKgcm3(weight)
        break
      case 'kg/l':
        value = kgm3ToKgL(weight)
        break
      case 'kg/mm³':
        value = kgm3ToKgmm3(weight)
        break
      case 'kg/m³':
        value = weight
        break
      default:
        value = weight
    }

    const formattedValue = intl.formatNumber(value, {
      maximumSignificantDigits: 5
    })

    return (
      <Section.Item key={unit.name}>
        {`${formattedValue} ${unit.name}`}
      </Section.Item>
    )
  }

  if (!visibleDensityUnits) return null

  return (
    <Section style={style} disabled={!weight}>
      <Section.Header>Peso</Section.Header>

      {visibleDensityUnits.map(unit => renderText(unit))}
    </Section>
  )
}
