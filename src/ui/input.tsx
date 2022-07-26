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

interface InputProps extends TextInputProps {}

interface InputState {
  readonly isFocus: boolean
  readonly isDark: boolean
}

export class Input extends React.Component<InputProps, InputState> {
  private ref = React.createRef<TextInput>()

  private colorSchemeSubscription: NativeEventSubscription | null = null

  constructor(props: InputProps) {
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

    return (
      <TextInput
        ref={this.ref}
        {...rest}
        style={[
          style,
          styles.input,
          { color: this.state.isDark ? '#fff' : '#434545' },
          { borderColor: this.state.isFocus ? '#424cd6' : '#41d5c4' }
        ]}
        onBlur={this.onBlur}
        onFocus={this.onFocus}
        selectionColor="#424cd6"
        placeholderTextColor={this.state.isDark ? '#a9a7a7' : '#918e8e'}
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
