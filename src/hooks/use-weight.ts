import * as React from 'react'

import { DensityUnit } from '../types/unit'

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
      case 'kg/m³': {
        valueKgM3 = value
      }
    }

    return valueKgM3 * volume
  }, [specificWeight, specificWeightUnit, volume])

  return weight
}
