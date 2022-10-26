import { useTheme } from '@react-navigation/native'
import * as React from 'react'
import { StyleSheet, Text } from 'react-native'
import { getVersion } from 'react-native-device-info'

import { t } from 'i18n'
import { RootStackScreenProps } from 'navigation'
import { Form, Section } from 'ui'

export function SettingsScreen(props: RootStackScreenProps<'Settings'>) {
  const { navigation } = props

  const theme = useTheme()

  return (
    <>
      <Form>
        <Section style={{ marginTop: 32 }}>
          <Section.Header>{t('options')}</Section.Header>

          <Section.Item
            onPress={() => navigation.navigate('DisplayPreferences')}
          >
            <Section.Item.Content>
              {t('screens.display-preferences.title')}
            </Section.Item.Content>
          </Section.Item>
          <Section.Item
            onPress={() => navigation.navigate('SelectionPreferences')}
          >
            <Section.Item.Content>
              {t('screens.selection-preferences.title')}
            </Section.Item.Content>
          </Section.Item>
        </Section>
      </Form>
      <Text style={[styles.version, { color: theme.colors.text }]}>
        {t('version')} {getVersion()}
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
