import type { DensityUnitSymbol, UnitSymbol, VolumeUnitSymbol } from '@/models'

import {
  cmToM,
  cmToMm,
  m3ToCm3,
  m3ToL,
  m3ToMm3,
  mmToCm,
  mmToM,
  mToCm,
  mToMm
} from '@/utils/unit'

import { kgm3ToKgcm3, kgm3ToKgL, kgm3ToKgmm3 } from './density-unit'

type Convert<T> = {
  value: number
  unit: T
}

function fn(value: number) {
  return value
}

function getConvertUnitFunction(
  from: UnitSymbol,
  to: UnitSymbol
): (value: number) => number {
  const mapper = {
    cm: { cm: fn, m: cmToM, mm: cmToMm },
    m: { cm: mToCm, m: fn, mm: mToMm },
    mm: { cm: mmToCm, m: mmToM, mm: fn }
  }

  return mapper[from][to]
}

function getConvertDensityUnitFunction(
  to: DensityUnitSymbol
): (value: number) => number {
  const mapper = {
    'kg/m³': fn,
    'kg/cm³': kgm3ToKgcm3,
    'kg/mm³': kgm3ToKgmm3,
    'kg/l': kgm3ToKgL
  }

  return mapper[to]
}

function getConvertVolumeUnitFunction(
  to: VolumeUnitSymbol
): (value: number) => number {
  const mapper = {
    'cm³': m3ToCm3,
    l: m3ToL,
    'mm³': m3ToMm3,
    'm³': fn
  }

  return mapper[to]
}

export function convertUnits(unit: UnitSymbol, ...args: Convert<UnitSymbol>[]) {
  const result: number[] = []

  for (const arg of args) {
    const convertFunction = getConvertUnitFunction(arg.unit, unit)

    result.push(convertFunction(arg.value))
  }

  return result
}

export function convertDensityUnits(...args: Convert<DensityUnitSymbol>[]) {
  const result: number[] = []

  for (const arg of args) {
    const convertFunction = getConvertDensityUnitFunction(arg.unit)

    result.push(convertFunction(arg.value))
  }

  return result
}

export function convertVolumeUnits(...args: Convert<VolumeUnitSymbol>[]) {
  const result: number[] = []

  for (const arg of args) {
    const convertFunction = getConvertVolumeUnitFunction(arg.unit)

    result.push(convertFunction(arg.value))
  }

  return result
}

export function convertStringToNumber(...args: string[]) {
  const result: number[] = []

  for (const arg of args) {
    if (!arg) {
      result.push(0)
      continue
    }

    const value = Number(arg.replace(',', '.'))

    if (Number.isNaN(value)) {
      result.push(0)
      continue
    }

    result.push(value)
  }

  return result
}
