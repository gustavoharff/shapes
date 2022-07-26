/* eslint-disable no-unused-vars, no-undef */

import type { NativeStackScreenProps } from '@react-navigation/native-stack'

export type RootStackParamList = {
  Home: undefined
  CubeForm: undefined
}

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
