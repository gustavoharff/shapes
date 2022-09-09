import { HeaderHeightContext } from '@react-navigation/elements'
import * as React from 'react'
import { Platform, ScrollView, StyleProp, ViewStyle } from 'react-native'

interface FormProps {
  readonly children: React.ReactNode
  readonly style?: StyleProp<ViewStyle>
}

export class Form extends React.Component<FormProps> {
  public render() {
    return (
      <HeaderHeightContext.Consumer>
        {height => (
          <ScrollView
            contentContainerStyle={[
              {
                marginTop: Platform.OS === 'android' ? height : 0
              },
              this.props.style
            ]}
            contentInsetAdjustmentBehavior="automatic"
          >
            {this.props.children}
          </ScrollView>
        )}
      </HeaderHeightContext.Consumer>
    )
  }
}
