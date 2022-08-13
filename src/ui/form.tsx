import { HeaderHeightContext } from '@react-navigation/elements'
import * as React from 'react'
import { Platform, ScrollView, StyleSheet } from 'react-native'

interface FormProps {
  readonly children: React.ReactNode
}

export class Form extends React.Component<FormProps> {
  public render() {
    return (
      <HeaderHeightContext.Consumer>
        {height => (
          <ScrollView
            contentContainerStyle={[
              styles.form,
              {
                marginTop: Platform.OS === 'android' ? height : 0
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

const styles = StyleSheet.create({
  form: {
    padding: 16
  }
})
