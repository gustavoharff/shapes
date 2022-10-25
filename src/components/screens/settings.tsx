import { useTheme } from '@react-navigation/native'
import * as React from 'react'
import { StyleSheet, Text } from 'react-native'
import { getVersion } from 'react-native-device-info'

import { RootStackScreenProps } from 'navigation'
import { Form, Section } from 'ui'

export function SettingsScreen(props: RootStackScreenProps<'Settings'>) {
  const { navigation } = props

  const theme = useTheme()

  return (
    <>
      <Form>
        <Section style={{ marginTop: 32 }}>
          <Section.Header>Opções</Section.Header>

          <Section.Item
            onPress={() => navigation.navigate('DisplayPreferences')}
          >
            <Section.Item.Content>
              Preferências de exibição
            </Section.Item.Content>
          </Section.Item>
          <Section.Item
            onPress={() => navigation.navigate('SelectionPreferences')}
          >
            <Section.Item.Content>Preferências de seleção</Section.Item.Content>
          </Section.Item>
        </Section>
      </Form>
      <Text style={[styles.version, { color: theme.colors.text }]}>
        Versão {getVersion()}
      </Text>
    </>
  )
}

const styles = StyleSheet.create({
  version: {
    textAlign: 'center',
    paddingVertical: 8,
    marginBottom: 16
  }
})
