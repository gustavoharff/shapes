import { useTheme } from '@react-navigation/native'
import * as React from 'react'
import { View } from 'react-native'
import Svg, { Path } from 'react-native-svg'

import { FigureProps } from './types'

export function Cylinder(props: FigureProps) {
  const { size = 250, style } = props

  const theme = useTheme()

  return (
    <View style={[{ width: size, height: size }, style]}>
      <Svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
        <Path
          d="M49.9805 84.5573C66.7841 84.5573 77.9681 78.1838 77.9681 69.2015V29.8209H72.7325V69.2015C72.7325 75.2618 63.6276 79.6667 49.9805 79.6667C36.3405 79.6667 27.2357 75.2618 27.2357 69.2015V29.8209H22V69.2015C22 78.1838 33.177 84.5573 49.9805 84.5573ZM49.9805 43.6764C66.7841 43.6764 77.9681 38.0442 77.9681 29.8209C77.9681 21.6251 66.7841 16 49.9805 16C33.177 16 22 21.6251 22 29.8209C22 38.0442 33.177 43.6764 49.9805 43.6764ZM49.9805 38.7513C36.3405 38.7513 27.2357 35.0947 27.2357 29.8209C27.2357 24.3746 36.3405 20.5801 49.9805 20.5801C63.6276 20.5801 72.7325 24.3746 72.7325 29.8209C72.7325 35.0947 63.6276 38.7513 49.9805 38.7513Z"
          fill={theme.colors.primary}
        />
      </Svg>
    </View>
  )
}
