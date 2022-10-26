/* eslint-disable no-unused-vars, no-undef */

import type { NativeStackScreenProps } from '@react-navigation/native-stack'

import { DensityUnitSymbol, UnitSymbol } from 'models'

export type RootStackParamList = {
  Home: undefined
  CubeForm: undefined
  ConeForm: undefined
  ConeTrunkForm: undefined
  ParallelepipedForm: undefined
  CylinderForm: undefined
  PyramidForm: undefined
  HexagonalPrismForm: undefined
  SelectUnit: {
    unit: UnitSymbol
    onSelect: (unit: UnitSymbol) => void
  }
  SelectDensityUnit: {
    unit: DensityUnitSymbol
    onSelect: (unit: DensityUnitSymbol) => void
  }
  Settings: undefined
  DisplayPreferences: undefined
  SelectionPreferences: undefined
}

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>

/* eslint-disable */
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
