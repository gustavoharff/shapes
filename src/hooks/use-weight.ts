import * as React from 'react'

import { DensityUnit } from '../types/unit'
import { kgCm3ToKgM3, kgLToKgM3, kgMm3ToKgM3 } from '../utils'

export function useWeight(
  specificWeight: string,
  specificWeightUnit: DensityUnit,
  volume: number
) {
  const weight = React.useMemo(() => {
    if (!volume) return 0
    if (!specificWeight) return 0

    const value = Number(specificWeight.replace(',', '.'))

    if (Number.isNaN(value)) return 0

    let valueKgM3: number

    switch (specificWeightUnit) {
      case 'kg/l': {
        valueKgM3 = kgLToKgM3(value)
        break
      }
      case 'kg/m³': {
        valueKgM3 = value
        break
      }
      case 'kg/cm³': {
        valueKgM3 = kgCm3ToKgM3(value)
        break
      }
      case 'kg/mm³': {
        valueKgM3 = kgMm3ToKgM3(value)
        break
      }
    }

    return valueKgM3 * volume
  }, [specificWeight, specificWeightUnit, volume])

  return weight
}
