import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

interface ParallelepipedProps {
  size?: number
  primaryColor?: string
  secondaryColor?: string
}

export class Parallelepiped extends React.Component<ParallelepipedProps> {
  public render() {
    const {
      size = 250,
      primaryColor = '#5E66D7',
      secondaryColor = '#72DCCF'
    } = this.props

    return (
      <Svg width={size} height={size} viewBox="0 0 177 177" fill="none">
        <Path
          d="M110.407 46.7553L110.127 46.6522L19.1972 73.8559L19.7892 112.258L67.008 130.977L157.74 103.01L157.341 65.416L157.511 64.7031L110.407 46.7553ZM66.0926 128.554L21.6714 110.943L21.1576 76.0065L65.7205 93.6439L66.0926 128.554ZM23.2328 74.7746L110.017 48.6538L153.29 65.1434L66.7319 91.9871L23.2328 74.7746ZM155.81 101.545L68.0102 128.719L67.6441 93.7202L155.438 66.5363L155.81 101.545Z"
          fill={primaryColor}
        />
        <Path
          d="M153.284 65.1377L66.7319 91.9871L23.2347 74.7727L110.013 48.6539L153.284 65.1377Z"
          fill={primaryColor}
        />
        <Path
          d="M65.7244 93.6477L66.0926 128.554L21.6714 110.943L21.1616 76.0103L65.7244 93.6477Z"
          fill={secondaryColor}
        />
        <Path
          d="M155.434 66.5403L155.802 101.537L68.0064 128.723L67.6403 93.7242L155.434 66.5403Z"
          fill={secondaryColor}
        />
      </Svg>
    )
  }
}
