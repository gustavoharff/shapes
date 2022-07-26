import * as React from 'react'
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputFocusEventData,
  TextInputProps
} from 'react-native'

interface InputProps extends TextInputProps {}

interface InputState {
  readonly isFocus: boolean
}

export class Input extends React.Component<InputProps, InputState> {
  private ref = React.createRef<TextInput>()

  constructor(props: InputProps) {
    super(props)

    this.state = {
      isFocus: false
    }
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
          { borderColor: this.state.isFocus ? '#424cd6' : '#41d5c4' }
        ]}
        onBlur={this.onBlur}
        onFocus={this.onFocus}
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
    fontWeight: '500',
    color: '#434545'
  }
})
