import { useTheme } from '@react-navigation/native'
import * as React from 'react'
import { StyleSheet, Text } from 'react-native'
import { getVersion } from 'react-native-device-info'

import { RootStackScreenProps } from '../navigation/types'
import { Form } from '../ui'
import { Section } from '../ui/section'

export function SettingsScreen({
  navigation
}: RootStackScreenProps<'Settings'>) {
  const theme = useTheme()

  return (
    <>
      <Form padding={false}>
        <Section title="OPÇÕES" style={{ marginTop: 32 }}>
          <Section.Item
            label="Preferências de exibição"
            onPress={() => navigation.navigate('Preferences')}
            isFirst
            isLast
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
