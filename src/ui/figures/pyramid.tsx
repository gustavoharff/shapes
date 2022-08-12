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
          d="M39.8259 126.181L41.6799 126.397L41.7745 126.537L41.9151 126.443L118.833 135.347L166.833 99.9862L91.1861 5.63677L40.5819 124.393L40.3237 124.567L40.4279 124.721L39.8259 126.181ZM118.165 132.837L44.7807 124.315L84.973 94.8442L161.768 100.697L118.165 132.837ZM92.4877 11.0965L162.428 98.3273L85.9299 92.4874L92.4877 11.0965ZM89.7181 15.2814L83.4564 92.9553L44.4248 121.574L89.7181 15.2814Z"
          fill={primaryColor}
        />
        <Path
          d="M44.7807 124.315L84.9701 94.8462L161.771 100.708L118.165 132.837L44.7807 124.315Z"
          fill={primaryColor}
        />
        <Path
          d="M44.4247 121.574L89.718 15.2814L83.4563 92.9553L44.4247 121.574Z"
          fill={secondaryColor}
        />
        <Path
          d="M85.9242 92.4913L92.4877 11.0965L162.422 98.3311L85.9242 92.4913Z"
          fill={secondaryColor}
        />
      </Svg>
    )
  }
}
