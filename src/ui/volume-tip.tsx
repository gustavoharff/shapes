import * as React from 'react'
import { IntlContext, IntlProvider, IntlShape } from 'react-intl'
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

  const selectedVolumeUnits = volumeUnits.filter(unit => unit.selected)

  function renderText(unit: VolumeUnit, index: number, intl: IntlShape) {
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
      <Section.Item
        key={unit.name}
        label={`${formattedValue} ${unit.name}`}
        isFirst={index === 0}
        isLast={index + 1 === selectedVolumeUnits.length}
      />
    )
  }

  if (!selectedVolumeUnits) return null

  return (
    <Section title="VOLUME" style={style} disabled={!volume}>
      <IntlProvider locale="pt-BR">
        <IntlContext.Consumer>
          {intl =>
            selectedVolumeUnits.map((unit, index) =>
              renderText(unit, index, intl)
            )
          }
        </IntlContext.Consumer>
      </IntlProvider>
    </Section>
  )
}
