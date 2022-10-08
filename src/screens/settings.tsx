import { useTheme } from '@react-navigation/native'
import * as React from 'react'
import { StyleSheet, Text } from 'react-native'
import { getVersion } from 'react-native-device-info'

import { RootStackScreenProps } from '../navigation/types'
import { Form, Section } from '../ui'

export function SettingsScreen(props: RootStackScreenProps<'Settings'>) {
  const { navigation } = props

  const theme = useTheme()

  return (
    <>
      <Form>
        <Section title="OPÇÕES" style={{ marginTop: 32 }}>
          <Section.Item
            label="Preferências de exibição"
            onPress={() => navigation.navigate('DisplayPreferences')}
            isFirst
            isLast={false}
          />
          <Section.Item
            label="Preferências de seleção"
            onPress={() => navigation.navigate('SelectionPreferences')}
            isLast
            isFirst={false}
          />
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
