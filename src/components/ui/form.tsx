import { HeaderHeightContext } from '@react-navigation/elements'
import * as React from 'react'
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleProp,
  StyleSheet,
  ViewStyle
} from 'react-native'

interface FormProps {
  readonly children: React.ReactNode
  readonly style?: StyleProp<ViewStyle>
}

export function Form(props: FormProps) {
  const { children, style } = props

  const [avoidingView, setAvoidingView] = React.useState(false)

  React.useEffect(() => {
    const keyboardWillShow = Keyboard.addListener('keyboardWillShow', () => {
      setAvoidingView(true)
    })

    const keyboardWillHide = Keyboard.addListener('keyboardWillHide', () => {
      setAvoidingView(false)
    })

    return () => {
      keyboardWillShow.remove()
      keyboardWillHide.remove()
    }
  }, [])

  return (
    <HeaderHeightContext.Consumer>
      {height => (
        <KeyboardAvoidingView
          enabled={avoidingView}
          behavior="padding"
          style={[
            { marginTop: Platform.OS === 'android' ? height : 0 },
            styles.form,
            style
          ]}
        >
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            keyboardShouldPersistTaps="never"
          >
            {children}
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </HeaderHeightContext.Consumer>
  )
}

const styles = StyleSheet.create({
  form: {
    paddingVertical: 16,
    flex: 1
  }
})
