import * as React from 'react'
import { useIntl } from 'react-intl'
import { StyleProp, ViewStyle } from 'react-native'

import { useDensityUnits } from 'hooks'
import { t } from 'i18n'
import { DensityUnit } from 'models'
import { Section } from 'ui'
import { convertDensityUnits } from 'utils'

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
    const [value] = convertDensityUnits({ value: weight, unit: unit.symbol })

    const formattedValue = intl.formatNumber(value, {
      maximumSignificantDigits: 5
    })

    return (
      <Section.Item key={unit.symbol}>
        {`${formattedValue} ${unit.symbol}`}
      </Section.Item>
    )
  }

  if (!visibleDensityUnits) return null

  return (
    <Section style={style} disabled={!weight}>
      <Section.Header>{t('ui.weight-tip.title')}</Section.Header>

      {visibleDensityUnits.map(unit => renderText(unit))}
    </Section>
  )
}
