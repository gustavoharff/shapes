import { useTheme } from '@react-navigation/native'
import * as React from 'react'
import { View } from 'react-native'
import Svg, { Path } from 'react-native-svg'

import { FigureProps } from './types'

export function HexagonalPrism(props: FigureProps) {
  const { size = 250, style } = props

  const theme = useTheme()

  return (
    <View style={[{ width: size, height: size }, style]}>
      <Svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M80.512 64.4522V31.2454C80.4158 27.7047 78.8215 25.5709 76.4812 23.4701L67.6716 15.6385C67.4761 15.4943 67.2903 15.3512 67.1079 15.2107C65.7178 14.1397 64.5308 13.2252 60.7884 13.2252L39.1956 13.3285C36.3438 13.422 33.1875 15.0157 32.3124 15.6344L23.602 23.6092C21.3994 25.5365 19.5409 27.3605 19.488 31.2405V63.454C19.5 65.9689 19.7713 66.5238 21.125 68.6875L21.667 69.8057L28.7391 82.3692C31.4994 85.3189 33.6815 86.8007 37.8455 86.7745C40.7595 86.7561 50.0632 86.7634 56.0213 86.7694H56.0326C56.9614 86.7704 57.474 86.7681 57.9502 86.7659C58.7821 86.7621 59.5032 86.7589 62.1383 86.7744C66.282 86.7988 67.934 86.0072 71.2462 82.3691L78.9375 69.375C80.0703 66.8808 80.5 65.8907 80.512 64.4522ZM32.1779 40.8806L24.9431 32.3975V63.454C24.9844 64.6094 25.2737 65.3752 26.25 67.125L32.1779 78.04V40.8806ZM75.0384 64.4539V32.4018L67.7991 40.8806L67.8101 78.04L73.9375 67.9375C74.7716 66.4239 75.0313 65.547 75.0384 64.4539ZM28.0069 27.6875L34.9927 35.8752L64.9907 35.7626L71.9768 27.6882L64.4338 20.0768C63.5073 19.1792 62.5781 18.7318 60.919 18.7001L39.058 18.6974C37.9375 18.7501 36.1875 19.5626 35.5475 20.0741L28.0069 27.6875ZM62.1383 40.7706L37.8455 40.8806V81.3439L62.1383 81.3449V40.7706Z"
          fill={theme.colors.primary}
        />
      </Svg>
    </View>
  )
}
