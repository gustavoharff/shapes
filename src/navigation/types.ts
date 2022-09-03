/* eslint-disable no-unused-vars, no-undef */

import type { NativeStackScreenProps } from '@react-navigation/native-stack'

import { DensityUnit, Unit } from '../types/unit'

export type RootStackParamList = {
  Home: undefined
  CubeForm: undefined
  CubeInformation: undefined
  ConeForm: undefined
  ParallelepipedForm: undefined
  CylinderForm: undefined
  PyramidForm: undefined
  SelectUnit: {
    unit: Unit
    onSelect: (unit: Unit) => void
  }
  SelectDensityUnit: {
    unit: DensityUnit
    onSelect: (unit: DensityUnit) => void
  }
  Settings: undefined
  Preferences: undefined
}

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>

/* eslint-disable */
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
