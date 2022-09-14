import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

interface PyramidProps {
  size?: number
  primaryColor?: string
  secondaryColor?: string
}

export class Pyramid extends React.Component<PyramidProps> {
  public render() {
    const {
      size = 250,
      primaryColor = '#5E66D7',
      secondaryColor = '#72DCCF'
    } = this.props

    return (
      <Svg width={size} height={size} viewBox="0 0 169 170" fill="none">
        <Path
          d="M21 140.544L22.854 140.76L22.9486 140.9L23.0892 140.806L100.007 149.71L148.007 114.349L72.3602 20L21.756 138.756L21.4978 138.93L21.602 139.084L21 140.544ZM99.3391 147.2L25.9548 138.678L66.1471 109.207L142.942 115.06L99.3391 147.2ZM73.6618 25.4597L143.602 112.691L67.104 106.851L73.6618 25.4597ZM70.8922 29.6446L64.6305 107.319L25.5989 135.937L70.8922 29.6446Z"
          fill={primaryColor}
        />
        <Path
          d="M25.9548 138.678L66.1442 109.209L142.945 115.071L99.3391 147.2L25.9548 138.678Z"
          fill={primaryColor}
        />
        <Path
          d="M25.5988 135.937L70.8921 29.6446L64.6304 107.319L25.5988 135.937Z"
          fill={secondaryColor}
        />
        <Path
          d="M67.0983 106.855L73.6618 25.4597L143.596 112.694L67.0983 106.855Z"
          fill={secondaryColor}
        />
      </Svg>
    )
  }
}
