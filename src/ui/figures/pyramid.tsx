import { useTheme } from '@react-navigation/native'
import * as React from 'react'
import { View } from 'react-native'
import Svg, { Path } from 'react-native-svg'

import { FigureProps } from './types'

export function Pyramid(props: FigureProps) {
  const { size = 250, style } = props

  const theme = useTheme()

  return (
    <View style={[{ width: size, height: size }, style]}>
      <Svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
        <Path
          d="M17.4965 66.7838C15.9731 69.4224 16.5349 72.3158 19.2839 73.507L47.9063 85.8162C49.3527 86.4285 50.7867 86.4285 52.3035 85.7951L80.8833 73.507C83.64 72.3158 84.2013 69.4224 82.678 66.7838L53.1516 15.242C52.2462 13.6593 51.1324 13.3334 50.0665 13.3334C49.0351 13.3334 47.9284 13.6593 47.023 15.242L17.4965 66.7838ZM22.7386 67.8004L49.4907 21.4136C49.6294 21.1503 49.8237 20.9976 50.0665 20.9976C50.3439 20.9976 50.5452 21.1433 50.6839 21.4136L77.4013 67.8004C77.8813 68.6697 77.6167 69.3939 76.8647 69.7282L51.2396 81.291C50.3382 81.6964 49.8435 81.6964 48.9983 81.3537L23.303 69.7282C22.5507 69.3939 22.2585 68.6697 22.7386 67.8004ZM47.6212 83.8248H52.5463V18.3184H47.6212V83.8248Z"
          fill={theme.colors.primary}
        />
      </Svg>
    </View>
  )
}
