/** Convert `kg/m³` to `kg/cm³`. */
export function kgm3ToKgcm3(kgm3: number) {
  return kgm3 / 1e-6
}

/** Convert `kg/m³` to `kg/mm³`. */
export function kgm3ToKgmm3(kgm3: number) {
  return kgm3 / 1e-9
}

/** Convert `kg/m³` to `kg/l`. */
export function kgm3ToKgL(kgm3: number) {
  return kgm3 / 1000
}

/** Convert `kg/l` to `kg/m³`. */
export function kgLToKgM3(kgL: number) {
  return kgL * 1000
}

/** Convert `kg/cm³` to `kg/m³`. */
export function kgCm3ToKgM3(kgCm3: number) {
  return kgCm3 * 1e6
}

/** Convert `kg/mm³` to `kg/m³`. */
export function kgMm3ToKgM3(kgMm3: number) {
  return kgMm3 * 1e9
}
