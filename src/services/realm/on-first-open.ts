import type { DensityUnit, Unit, VolumeUnit } from '@/models'

const units: Unit['symbol'][] = ['m', 'cm', 'mm']

const volumeUnits: VolumeUnit['symbol'][] = ['l', 'm³', 'cm³', 'mm³']

const dencityUnits: DensityUnit['symbol'][] = [
  'kg/l',
  'kg/m³',
  'kg/cm³',
  'kg/mm³'
]

export function onFirstOpen(realm: Realm) {
  for (const unit of units) {
    const selected = unit === 'cm'

    realm.create<Unit>('Unit', {
      symbol: unit,
      selected,
      visible: true
    })
  }

  for (const volumeUnit of volumeUnits) {
    realm.create<VolumeUnit>('VolumeUnit', {
      symbol: volumeUnit,
      visible: true
    })
  }

  for (const dencityUnit of dencityUnits) {
    const selected = dencityUnit === 'kg/m³'

    realm.create<DensityUnit>('DensityUnit', {
      symbol: dencityUnit,
      selected,
      visible: true
    })
  }
}
