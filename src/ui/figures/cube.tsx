import { useTheme } from '@react-navigation/native'
import * as React from 'react'
import { View } from 'react-native'
import Svg, { Path } from 'react-native-svg'

import { FigureProps } from './types'

export function Cube(props: FigureProps) {
  const { size = 250, style } = props

  const theme = useTheme()

  return (
    <View style={[{ width: size, height: size }, style]}>
      <Svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
        <Path
          d="M21.89 70.3662L47.4875 84.8765C49.3412 85.9276 51.0429 85.9347 52.8762 84.8765L78.4734 70.3662C81.4614 68.6786 83.0647 66.9699 83.0647 62.2773V36.514C83.0647 33.1632 81.7927 31.0489 79.0567 29.4598L56.0467 16.3564C52.1004 14.1034 48.2978 14.1034 44.3515 16.3564L21.3417 29.4598C18.5711 31.0489 17.3333 33.1632 17.3333 36.514V62.2773C17.3333 66.9699 18.9295 68.6786 21.89 70.3662ZM24.7999 66.0986C22.9224 65.018 22.2866 63.9458 22.2866 62.1111V37.5645L47.6225 52.0372V79.0691L24.7999 66.0986ZM75.5983 66.0986L52.7687 79.0691V52.0372L78.1114 37.5645V62.1111C78.1114 63.9458 77.4414 65.018 75.5983 66.0986ZM50.1783 47.4923L25.0686 33.2878L46.5017 21.0591C49.0377 19.601 51.3605 19.5664 53.862 21.0591L75.3226 33.2878L50.1783 47.4923Z"
          fill={theme.colors.primary}
        />
      </Svg>
    </View>
  )
}
