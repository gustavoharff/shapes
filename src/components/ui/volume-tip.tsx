import * as React from 'react'
import { useIntl } from 'react-intl'
import { StyleProp, ViewStyle } from 'react-native'

import { useVolumeUnits } from '@/hooks'
import { t } from '@/i18n'
import { VolumeUnit } from '@/models'
import { Section } from '@/components/ui'
import { convertVolumeUnits } from '@/utils'

interface VolumeTipProps {
  readonly volume: number
  readonly style?: StyleProp<ViewStyle>
}

export function VolumeTip(props: VolumeTipProps) {
  const { volume, style } = props

  const volumeUnits = useVolumeUnits()

  const intl = useIntl()

  const visibleVolumeUnits = volumeUnits.filter(unit => unit.visible)

  function renderText(unit: VolumeUnit) {
    const [value] = convertVolumeUnits({ value: volume, unit: unit.symbol })

    const formattedValue = intl.formatNumber(value, {
      maximumSignificantDigits: 5
    })

    return (
      <Section.Item key={unit.symbol}>
        {`${formattedValue} ${unit.symbol}`}
      </Section.Item>
    )
  }

  if (!visibleVolumeUnits) return null

  return (
    <Section style={style} disabled={!volume}>
      <Section.Header>{t('ui.volume-tip.title')}</Section.Header>

      {visibleVolumeUnits.map(unit => renderText(unit))}
    </Section>
  )
}
