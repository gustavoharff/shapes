import { useTheme } from '@react-navigation/native'
import * as React from 'react'
import { View } from 'react-native'
import Svg, { Path } from 'react-native-svg'

import { FigureProps } from './types'

export function Cone(props: FigureProps) {
  const { size = 250, style } = props

  const theme = useTheme()

  return (
    <View style={[{ width: size, height: size }, style]}>
      <Svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
        <Path
          d="M17.3333 72.0939C17.3333 79.8086 31.0939 85.4633 50.0587 85.4633C69.0579 85.4633 82.8188 79.8086 82.8188 72.0939C82.8188 71.0216 82.3001 69.4804 81.5748 68.1047L53.1367 16.5753C52.2729 14.9926 51.1246 14.6667 50.0587 14.6667C48.9928 14.6667 47.879 14.9926 47.0081 16.5753L18.5774 68.1047C17.8515 69.4804 17.3333 71.0216 17.3333 72.0939ZM22.3964 72.0939C22.3964 71.7257 22.7773 70.9915 23.1786 70.2029L49.4829 22.7469C49.6215 22.4766 49.8159 22.3309 50.0587 22.3309C50.3361 22.3309 50.5303 22.4766 50.669 22.7469L76.9388 70.2029C77.3748 70.9915 77.7208 71.7257 77.7208 72.0939C77.7208 76.003 64.7264 80.3656 50.0587 80.3656C35.4255 80.3656 22.3964 76.003 22.3964 72.0939Z"
          fill={theme.colors.primary}
        />
      </Svg>
    </View>
  )
}
