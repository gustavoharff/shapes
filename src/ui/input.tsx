import * as React from 'react'
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  Appearance,
  NativeEventSubscription
} from 'react-native'

import { theme } from '../theme'

interface InputState {
  readonly isFocus: boolean
  readonly isDark: boolean
}

export class Input extends React.Component<TextInputProps, InputState> {
  private ref = React.createRef<TextInput>()

  private colorSchemeSubscription: NativeEventSubscription | null = null

  constructor(props: TextInputProps) {
    super(props)

    this.state = {
      isFocus: false,
      isDark: Appearance.getColorScheme() === 'dark'
    }
  }

  componentDidMount() {
    this.colorSchemeSubscription = Appearance.addChangeListener(
      this.onColorSchemeChange
    )
  }

  componentWillUnmount() {
    this.colorSchemeSubscription?.remove()
  }

  private onColorSchemeChange: Appearance.AppearanceListener = preference => {
    this.setState({ isDark: preference.colorScheme === 'dark' })
  }

  public focus = () => {
    this.ref.current?.focus()
  }

  private onBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    this.setState({ isFocus: false })

    this.props.onBlur?.(e)
  }

  private onFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    this.setState({ isFocus: true })

    this.props.onBlur?.(e)
  }

  public render() {
    const { style, ...rest } = this.props
    const { isDark, isFocus } = this.state

    return (
      <TextInput
        ref={this.ref}
        {...rest}
        style={[
          styles.input,
          { color: isDark ? '#fff' : '#434545' },
          {
            borderColor: isFocus ? theme.dark.primary : theme.dark.secondary
          },
          style
        ]}
        onBlur={this.onBlur}
        onFocus={this.onFocus}
        selectionColor={isDark ? theme.dark.primary : theme.light.primary}
        placeholderTextColor={isDark ? '#a9a7a7' : '#918e8e'}
      />
    )
  }
}

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 8,
    paddingVertical: 12,
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '500'
  }
})
