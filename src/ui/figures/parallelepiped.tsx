import { useTheme } from '@react-navigation/native'
import * as React from 'react'
import { View } from 'react-native'
import Svg, { Path } from 'react-native-svg'

import { FigureProps } from './types'

export function Parallelepiped(props: FigureProps) {
  const { size = 250, style } = props

  const theme = useTheme()

  return (
    <View style={[{ width: size, height: size }, style]}>
      <Svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
        <Path
          d="M16.1033 71.4754L39.168 84.542C40.8093 85.4794 42.3627 85.4794 44.0327 84.542L83.3627 65.4754C86.0593 63.952 87.466 62.3994 87.466 58.21V35.0067C87.466 31.9594 86.3527 30.0554 83.8907 28.6487L63.1407 16.8714C59.5947 14.8207 56.1653 14.8207 52.6193 16.8714L15.6047 34.6487C13.114 36.0554 12 37.9594 12 41.0067V64.2094C12 68.3994 13.436 69.952 16.1033 71.4754ZM18.7407 67.608C17.0407 66.6707 16.4547 65.6747 16.4547 64.0634V41.944L39.2853 54.9814V79.2974L18.7407 67.608ZM80.7547 61.608L43.8867 79.2974V54.9814L83.0113 35.944V58.0634C83.0113 59.6747 82.4247 60.6707 80.7547 61.608ZM41.6007 50.8794L18.9753 38.0767L54.5833 21.0607C56.84 19.772 58.9207 19.7427 61.2067 21.0607L80.52 32.0767L41.6007 50.8794Z"
          fill={theme.colors.primary}
        />
      </Svg>
    </View>
  )
}
