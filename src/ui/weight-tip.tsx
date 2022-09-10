import * as React from 'react'
import { IntlContext, IntlProvider, IntlShape } from 'react-intl'
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

  const visibleDensityUnits = densityUnits.filter(unit => unit.visible)

  function renderText(unit: DensityUnit, index: number, intl: IntlShape) {
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
      <Section.Item
        key={unit.name}
        label={`${formattedValue} ${unit.name}`}
        isFirst={index === 0}
        isLast={index + 1 === visibleDensityUnits.length}
      />
    )
  }

  if (!visibleDensityUnits) return null

  return (
    <Section title="PESO" style={style} disabled={!weight}>
      <IntlProvider locale="pt-BR">
        <IntlContext.Consumer>
          {intl =>
            visibleDensityUnits.map((unit, index) =>
              renderText(unit, index, intl)
            )
          }
        </IntlContext.Consumer>
      </IntlProvider>
    </Section>
  )
}
