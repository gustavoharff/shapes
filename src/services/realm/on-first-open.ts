import {
  DensityUnit as DensityUnitType,
  Unit as UnitType,
  VolumeUnit as VolumeUnitType
} from '../../types/unit'
import { Unit } from './entities'
import { DensityUnit } from './entities/density-unit'
import { VolumeUnit } from './entities/volume-unit'

type Units = {
  name: UnitType
  description: string
}

type VolumeUnits = {
  name: VolumeUnitType
  description: string
}

type DensityUnits = {
  name: DensityUnitType
  description: string
}

const units: Units[] = [
  { name: 'm', description: 'Metro (m)' },
  { name: 'cm', description: 'Centímetro (cm)' },
  { name: 'mm', description: 'Milímetro (mm)' }
]

const volumeUnits: VolumeUnits[] = [
  { name: 'l', description: 'Litro (l)' },
  { name: 'm³', description: 'Metro cúbico (m³)' },
  { name: 'cm³', description: 'Centímetro cúbico (cm³)' },
  { name: 'mm³', description: 'Milímetro cúbico (mm³)' }
]

const dencityUnits: DensityUnits[] = [
  { name: 'kg/l', description: 'Quilograma por litro (kg/l)' },
  { name: 'kg/m³', description: 'Quilograma por metro cúbico (kg/m³)' },
  { name: 'kg/cm³', description: 'Quilograma por centímetro cúbico (kg/cm³)' },
  { name: 'kg/mm³', description: 'Quilograma por milímetro cúbico (kg/mm³)' }
]

export function onFirstOpen(realm: Realm) {
  for (const unit of units) {
    realm.create<Unit>('Unit', {
      name: unit.name,
      description: unit.description,
      selected: true
    })
  }

  for (const volumeUnit of volumeUnits) {
    realm.create<VolumeUnit>('VolumeUnit', {
      name: volumeUnit.name,
      description: volumeUnit.description,
      selected: true
    })
  }

  for (const dencityUnit of dencityUnits) {
    realm.create<DensityUnit>('DensityUnit', {
      name: dencityUnit.name,
      description: dencityUnit.description,
      selected: true
    })
  }
}
