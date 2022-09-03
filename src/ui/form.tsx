import { HeaderHeightContext } from '@react-navigation/elements'
import * as React from 'react'
import { Platform, ScrollView } from 'react-native'

interface FormProps {
  readonly children: React.ReactNode
  readonly padding?: boolean
}

export class Form extends React.Component<FormProps> {
  public render() {
    const { padding = true } = this.props

    return (
      <HeaderHeightContext.Consumer>
        {height => (
          <ScrollView
            contentContainerStyle={[
              {
                marginTop: Platform.OS === 'android' ? height : 0,
                padding: padding ? 16 : 0
              }
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
