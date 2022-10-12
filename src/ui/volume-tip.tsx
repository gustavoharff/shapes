import * as React from 'react'
import { useIntl } from 'react-intl'
import { StyleProp, ViewStyle } from 'react-native'

import { useVolumeUnits } from '../hooks'
import { VolumeUnit } from '../services/realm'
import { m3ToCm3, m3ToL, m3ToMm3 } from '../utils'
import { Section } from './section'

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
    let value: number

    switch (unit.name) {
      case 'cm³':
        value = m3ToCm3(volume)
        break
      case 'l':
        value = m3ToL(volume)
        break
      case 'mm³':
        value = m3ToMm3(volume)
        break
      case 'm³':
        value = volume
        break
      default:
        value = volume
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

  if (!visibleVolumeUnits) return null

  return (
    <Section style={style} disabled={!volume}>
      <Section.Header>Volume</Section.Header>

      {visibleVolumeUnits.map(unit => renderText(unit))}
    </Section>
  )
}
