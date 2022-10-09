import { useTheme } from '@react-navigation/native'
import * as React from 'react'
import { View } from 'react-native'
import Svg, { Path } from 'react-native-svg'

import { FigureProps } from './types'

export function ConeTrunk(props: FigureProps) {
  const { size = 250, style } = props

  const theme = useTheme()

  return (
    <View style={[{ width: size, height: size }, style]}>
      <Svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
        <Path
          d="M17 62.4543C17 70.169 30.7606 75.8237 49.7254 75.8237C68.7246 75.8237 82.4855 70.169 82.4855 62.4543C82.4855 61.382 81.9668 59.8408 81.2415 58.4651L65.7311 28.8604L60.9935 31.3604L76.6055 60.5634C77.0415 61.3519 77.3875 62.0862 77.3875 62.4543C77.3875 66.3634 64.3931 70.726 49.7254 70.726C35.0922 70.726 22.0631 66.3634 22.0631 62.4543C22.0631 62.0992 22.4174 61.4037 22.8026 60.6473L22.8453 60.5634L39.0321 31.3604L34.5781 28.8604L18.2441 58.4651C17.5182 59.8408 17 61.382 17 62.4543Z"
          fill={theme.colors.primary}
        />
        <Path
          d="M49.9052 38.738C59.5916 38.738 66.6667 35.7595 66.6667 31.3604C66.6667 26.9803 59.6106 24 49.9052 24C40.2038 24 33.6667 27.3604 33.6667 31.3595C33.6667 35.3587 40.2227 38.738 49.9052 38.738ZM49.9052 33.6729C46.7844 33.6729 39.1667 33.2979 39.1667 31.3604C39.1667 29.4229 45.1438 28.8895 49.9052 28.875C54.6667 28.8604 60.9967 29.047 60.9967 31.3604C60.9967 33.6738 53.026 33.6729 49.9052 33.6729Z"
          fill={theme.colors.primary}
        />
      </Svg>
    </View>
  )
}