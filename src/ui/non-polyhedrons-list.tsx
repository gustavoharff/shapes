import { useNavigation } from '@react-navigation/native'
import * as React from 'react'
import { LayoutAnimation, View } from 'react-native'

import { Cone } from './figures/cone'
import { Cylinder } from './figures/cylinder'
import { Form } from './form'
import { Section } from './section'

const list = [
  { title: 'Cone', component: Cone, figure: 'cone' },
  { title: 'Cilindro', component: Cylinder, figure: 'cylinder' }
]

interface NonPolyhedronsListProps {
  readonly filter: string
  readonly footer?: React.ReactNode
}

export function NonPolyhedronsList(props: NonPolyhedronsListProps) {
  const { filter, footer } = props

  const navigation = useNavigation()

  const data = React.useMemo(() => {
    if (!filter) return list

    return list.filter(item =>
      item.title.toLowerCase().includes(filter.toLowerCase())
    )
  }, [filter])

  React.useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
  }, [data])

  return (
    <Form>
      <Section radius>
        {data.map(({ title, figure, component: Component }, index) => (
          <Section.Item
            key={figure}
            label={title}
            isFirst={index === 0}
            isLast={index + 1 === data.length}
            onPress={() => {
              if (figure === 'cubo') {
                navigation.navigate('CubeForm')
              }

              if (figure === 'cone') {
                navigation.navigate('ConeForm')
              }

              if (figure === 'parallelepiped') {
                navigation.navigate('ParallelepipedForm')
              }

              if (figure === 'cylinder') {
                navigation.navigate('CylinderForm')
              }

              if (figure === 'pyramid') {
                navigation.navigate('PyramidForm')
              }
            }}
            leftContent={() => (
              <View style={{ marginRight: 8, paddingVertical: 8 }}>
                <Component size={40} />
              </View>
            )}
          />
        ))}
      </Section>
      {footer}
    </Form>
  )
}
