import * as React from 'react'

import { DensityUnitSymbol } from '@/models'

import { convertDensityUnits, convertStringToNumber } from '../utils'

export function useWeight(
  specificWeight: string,
  specificWeightUnit: DensityUnitSymbol,
  volume: number
) {
  const weight = React.useMemo(() => {
    if (!volume) return 0

    const [specificWeightValue] = convertStringToNumber(specificWeight)

    const [valueKgM3] = convertDensityUnits({
      value: specificWeightValue,
      unit: specificWeightUnit
    })

    return valueKgM3 * volume
  }, [specificWeight, specificWeightUnit, volume])

  return weight
}
