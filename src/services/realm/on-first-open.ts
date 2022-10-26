import { DensityUnit, Unit, VolumeUnit } from 'models'

type Units<T extends string> = Array<{
  symbol: T
  description: string
}>

const units: Units<Unit['symbol']> = [
  { symbol: 'm', description: 'Metro (m)' },
  { symbol: 'cm', description: 'Centímetro (cm)' },
  { symbol: 'mm', description: 'Milímetro (mm)' }
]

const volumeUnits: Units<VolumeUnit['symbol']> = [
  { symbol: 'l', description: 'Litro (l)' },
  { symbol: 'm³', description: 'Metro cúbico (m³)' },
  { symbol: 'cm³', description: 'Centímetro cúbico (cm³)' },
  { symbol: 'mm³', description: 'Milímetro cúbico (mm³)' }
]

const dencityUnits: Units<DensityUnit['symbol']> = [
  { symbol: 'kg/l', description: 'Quilograma por litro (kg/l)' },
  { symbol: 'kg/m³', description: 'Quilograma por metro cúbico (kg/m³)' },
  {
    symbol: 'kg/cm³',
    description: 'Quilograma por centímetro cúbico (kg/cm³)'
  },
  { symbol: 'kg/mm³', description: 'Quilograma por milímetro cúbico (kg/mm³)' }
]

export function onFirstOpen(realm: Realm) {
  for (const unit of units) {
    const selected = unit.symbol === 'cm'

    realm.create<Unit>('Unit', {
      symbol: unit.symbol,
      description: unit.description,
      selected,
      visible: true
    })
  }

  for (const volumeUnit of volumeUnits) {
    realm.create<VolumeUnit>('VolumeUnit', {
      symbol: volumeUnit.symbol,
      description: volumeUnit.description,
      visible: true
    })
  }

  for (const dencityUnit of dencityUnits) {
    const selected = dencityUnit.symbol === 'kg/m³'

    realm.create<DensityUnit>('DensityUnit', {
      symbol: dencityUnit.symbol,
      description: dencityUnit.description,
      selected,
      visible: true
    })
  }
}
