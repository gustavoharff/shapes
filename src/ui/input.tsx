import * as React from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  useColorScheme,
  View
} from 'react-native'

import { SectionContext } from '../contexts'

interface InputProps extends TextInputProps {
  readonly isLast?: boolean
  readonly label?: string
}

interface InputRef {
  focus: () => void
}

export const Input = React.forwardRef<InputRef, InputProps>((props, ref) => {
  const { style, isLast, label, ...rest } = props

  const inputRef = React.useRef<TextInput>(null)

  const isDark = useColorScheme() === 'dark'

  const sectionContext = React.useContext(SectionContext)

  const placeholderTextColor = isDark
    ? 'rgba(235, 235, 245, 0.6)'
    : 'rgba(60, 60, 67, 0.6)'

  React.useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus()
  }))

  const border = React.useMemo(() => {
    if (sectionContext && isLast)
      return {
        borderBottomWidth: 0,
        borderBottomColor: 'transparent'
      }

    return {
      borderBottomWidth: 0.5,
      borderBottomColor: isDark ? '#38383A' : '#C6C6C8'
    }
  }, [isDark, isLast, sectionContext])

  const backgroundColor = isDark ? '#1C1C1E' : '#FFFFFF'
  const color = isDark ? '#fff' : '#000000'

  function renderLabel() {
    if (!label) return null

    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => inputRef.current?.focus()}
      >
        <Text style={[styles.label, { color }]}>{label}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {renderLabel()}

      <TextInput
        ref={inputRef}
        placeholderTextColor={placeholderTextColor}
        style={[styles.input, { ...border, color }, style]}
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
