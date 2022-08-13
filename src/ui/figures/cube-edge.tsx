import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

interface CubeEdgeProps {
  readonly size?: number
  readonly primaryColor?: string
}

export class CubeEdge extends React.Component<CubeEdgeProps> {
  public render() {
    const { size = 250, primaryColor = '#5E66D7' } = this.props

    return (
      <Svg width={size} height={size} viewBox="0 0 146 130" fill="none">
        <Path
          d="M73.8972 24.5521L73.5697 24.4225L17.8603 39.8972L17.9471 83.8674L71.7001 106.033L127.195 89.6813L127.332 46.639L127.537 45.8364L73.8972 24.5521ZM70.6786 103.242L20.1152 82.3881L20.0806 42.397L70.8116 63.2806L70.6786 103.242ZM22.4689 41.0099L73.4138 26.725L122.683 46.2693L72 61.3814L22.4689 41.0099ZM124.997 87.9671L72.8697 103.464L72.9926 63.4058L125.123 47.9037L124.997 87.9671Z"
          fill={primaryColor}
        />
        <Path d="M72 63.72V61.38L126 45.29V47.6406L72 63.72Z" fill="#E12121" />
      </Svg>
    )
  }
}
