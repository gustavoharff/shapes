import { useTheme } from '@react-navigation/native'
import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { CubeEdge, Form } from '../ui'

export function CubeInformation() {
  const theme = useTheme()

  return (
    <Form style={styles.form}>
      <Text style={[styles.text, { color: theme.colors.text }]}>
        Para realizar o cálculo do volume de um cubo, basta elevar o valor de
        uma das arestas à terceira potência, por exemplo:
      </Text>

      <View style={styles.figure}>
        <CubeEdge size={130} primaryColor={theme.colors.primary} />
      </View>

      <Text style={[styles.text, { color: theme.colors.text, marginTop: 8 }]}>
        Digamos que o valor de uma das arestas seja 4 centímetros, então podemos
        fazer o cálculo:
      </Text>

      <Text
        style={[
          styles.text,
          styles.calc,
          { color: theme.colors.text, marginTop: 8 }
        ]}
      >
        4³ = 64 cm³
      </Text>

      <Text
        style={[
          styles.text,
          styles.calc,
          { color: theme.colors.text, marginTop: 8 }
        ]}
      >
        4 cm x 4 cm x 4 cm = 64 cm³
      </Text>

      <Text style={[styles.text, { color: theme.colors.text, marginTop: 8 }]}>
        Então o volume de um cubo de 4 centímetros é 64 centímetros cúbicos.
      </Text>
    </Form>
  )
}

const styles = StyleSheet.create({
  form: {
    padding: 16
  },
  text: {
    lineHeight: 24
  },
  calc: {
    fontWeight: '500',
    fontSize: 15
  },
  figure: {
    alignItems: 'center'
  }
})
