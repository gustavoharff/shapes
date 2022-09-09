import * as React from 'react'
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  useColorScheme,
  View
} from 'react-native'

import { SectionContext } from '../contexts'

interface InputProps extends TextInputProps {
  readonly isLast?: boolean
}

export const Input = React.forwardRef<TextInput, InputProps>((props, ref) => {
  const { style, isLast, ...rest } = props

  const isDark = useColorScheme() === 'dark'

  const sectionContext = React.useContext(SectionContext)

  const placeholderTextColor = isDark
    ? 'rgba(235, 235, 245, 0.6)'
    : 'rgba(60, 60, 67, 0.6)'

  const border = React.useMemo(() => {
    if (sectionContext && isLast)
      return {
        borderBottomWidth: 0,
        borderBottomColor: 'transparent'
      }

    return {
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: isDark ? '#38383A' : '#C6C6C8'
    }
  }, [isDark, isLast, sectionContext])

  const backgroundColor = isDark ? '#1C1C1E' : '#FFFFFF'
  const color = isDark ? '#fff' : '#000000'

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <TextInput
        ref={ref}
        style={[styles.input, { ...border, color }, style]}
        placeholderTextColor={placeholderTextColor}
        {...rest}
      />
    </View>
  )
})

Input.displayName = 'Input'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 16
  },
  input: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingVertical: 11,
    fontSize: 17,
    lineHeight: 22
  }
})
