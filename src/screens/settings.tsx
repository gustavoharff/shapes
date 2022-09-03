import * as React from 'react'

import { Form } from '../ui'
import { Section } from '../ui/section'

export function SettingsScreen() {
  return (
    <Form padding={false}>
      <Section
        title="OPÇÕES"
        items={[{ label: 'Preferências' }]}
        style={{ marginTop: 32 }}
      />
    </Form>
  )
}
