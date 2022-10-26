export type Language = {
  navigation: {
    back: string
  }
  fields: {
    edge: string
    width: string
    height: string
    length: string
    'base-width': string
    'base-depth': string
    radius: string
    'minor-radius': string
    'greater-radius': string
    'specific-weight': string
  }
  screens: {
    home: {
      title: string
      search: {
        title: string
        cancel: string
      }
    }
    settings: {
      title: string
    }
    'display-preferences': {
      title: string
    }
    'selection-preferences': {
      title: string
    }
  }
  figures: {
    cube: string
    parallelepiped: string
    'hexagonal-prism': string
    pyramid: string
    cone: string
    cylinder: string
    'cone-trunk': string
  }
  ui: {
    'volume-tip': {
      title: string
    }
    'weight-tip': {
      title: string
    }
  }
  units: {
    title: string
    m: string
    cm: string
    mm: string
  }
  'volume-units': {
    title: string
    l: string
    'm³': string
    'cm³': string
    'mm³': string
  }
  'density-units': {
    title: string
    'kg/l': string
    'kg/m³': string
    'kg/cm³': string
    'kg/mm³': string
  }
  options: string
  version: string
}
