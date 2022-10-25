import * as React from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  useColorScheme,
  View,
  ViewStyle
} from 'react-native'

interface InputProps extends TextInputProps {
  readonly label?: string
  readonly borderTop?: boolean
  readonly borderBottom?: boolean
}

interface InputRef {
  focus: () => void
}

export const Input = React.forwardRef<InputRef, InputProps>((props, ref) => {
  const { style, label, borderTop = true, borderBottom = true, ...rest } = props

  const inputRef = React.useRef<TextInput>(null)

  const isDark = useColorScheme() === 'dark'

  const placeholderTextColor = isDark
    ? 'rgba(235, 235, 245, 0.6)'
    : 'rgba(60, 60, 67, 0.6)'

  React.useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus()
  }))

  const borderStyle: ViewStyle = React.useMemo(() => {
    const style: ViewStyle = {}

    const color = isDark ? '#38383A' : '#C6C6C8'

    if (borderTop) {
      style.borderTopWidth = 0.5
      style.borderTopColor = color
    }

    if (borderBottom) {
      style.borderBottomWidth = 0.5
      style.borderBottomColor = color
    }

    return style
  }, [borderBottom, borderTop, isDark])

  const backgroundColor = isDark ? '#1C1C1E' : '#FFFFFF'
  const color = isDark ? '#fff' : '#000000'

  function renderLabel() {
    if (!label) return null

    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => inputRef.current?.focus()}
        style={{ justifyContent: 'center' }}
      >
        <Text style={[styles.label, { color }]}>{label}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <View style={[styles.container, { backgroundColor }, borderStyle]}>
      {renderLabel()}

      <TextInput
        ref={inputRef}
        placeholderTextColor={placeholderTextColor}
        style={[styles.input, { color }, style]}
        {...rest}
      />
    </View>
  )
})

Input.displayName = 'Input'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 16
  },
  input: {
    paddingVertical: 11,
    fontSize: 17,
    flex: 1,
    lineHeight: 22
  },
  label: {
    paddingVertical: 11,
    fontSize: 17,
    lineHeight: 22,
    marginRight: 16
  }
})
