import * as React from 'react'

import { RootStackScreenProps } from '../navigation/types'
import { Form } from '../ui'
import { Section } from '../ui/section'

export function SettingsScreen({
  navigation
}: RootStackScreenProps<'Settings'>) {
  return (
    <Form padding={false}>
      <Section
        title="OPÇÕES"
        items={[
          {
            label: 'Preferências de exibição',
            onPress: () => navigation.navigate('Preferences')
          }
        ]}
        style={{ marginTop: 32 }}
      />
    </Form>
  )
}
