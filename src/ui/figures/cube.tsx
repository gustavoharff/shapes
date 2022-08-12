import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

interface CubeProps {
  size?: number
  primaryColor?: string
  secondaryColor?: string
}

export class Cube extends React.Component<CubeProps> {
  public render() {
    const {
      size = 250,
      primaryColor = '#5E66D7',
      secondaryColor = '#72DCCF'
    } = this.props

    return (
      <Svg width={size} height={size} viewBox="0 0 146 130" fill="none">
        <Path
          d="M73.8972 24.5521L73.5697 24.4225L17.8603 39.8972L17.9471 83.8674L71.7001 106.033L127.195 89.6813L127.332 46.639L127.537 45.8364L73.8972 24.5521ZM70.6786 103.242L20.1152 82.3881L20.0806 42.397L70.8116 63.2806L70.6786 103.242ZM22.4689 41.0099L73.4138 26.725L122.683 46.2693L71.978 61.3814L22.4689 41.0099ZM124.997 87.9671L72.8697 103.464L72.9926 63.4058L125.123 47.9037L124.997 87.9671Z"
          fill={primaryColor}
        />
        <Path
          d="M122.682 46.265L71.9848 61.3954L22.4675 41.0126L73.4167 26.7193L122.682 46.265Z"
          fill={primaryColor}
        />
        <Path
          d="M70.806 63.2777L70.68 103.239L20.1097 82.3852L20.075 42.3942L70.806 63.2777Z"
          fill={secondaryColor}
        />
        <Path
          d="M125.123 47.9037L124.997 87.9671L72.8698 103.464L72.997 63.3974L125.123 47.9037Z"
          fill={secondaryColor}
        />
      </Svg>
    )
  }
}
