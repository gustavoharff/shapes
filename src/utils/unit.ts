/** Convert `m` to `cm`. */
export function mToCm(m: number) {
  return m * 100
}

/** Convert `cm` to `mm`. */
export function cmToMm(cm: number) {
  return cm * 10
}

/** Convert `m` to `mm`. */
export function mToMm(m: number) {
  const cm = mToCm(m)

  return cmToMm(cm)
}

/** Convert `cm` to `m`. */
export function cmToM(cm: number) {
  return cm / 100
}

/** Convert `cm³` to `m³`. */
export function cm3ToM3(cm3: number) {
  return cm3 * 0.000001
}

/** Convert `cm³` to `mm³`. */
export function cm3ToMm3(cm3: number) {
  return cm3 * 1000
}

/** Convert `m³` to `cm³`. */
export function m3ToCm3(m3: number) {
  return m3 / 0.000001
}

/** Convert `m³` to `mm³`. */
export function m3ToMm3(m3: number) {
  const cm3 = m3ToCm3(m3)

  return cm3ToMm3(cm3)
}

/** Convert `mm` to `cm`. */
export function mmToCm(mm: number) {
  return mm / 10
}

/** Convert `mm` to `m`. */
export function mmToM(mm: number) {
  const cm = mmToCm(mm)
  return cmToM(cm)
}

/** Convert `m³` to `l`. */
export function m3ToL(m3: number) {
  return m3 * 1000
}
