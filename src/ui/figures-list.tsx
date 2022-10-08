import { useNavigation } from '@react-navigation/native'
import * as React from 'react'
import { LayoutAnimation, View } from 'react-native'

import { Cone } from './figures/cone'
import { ConeTrunk } from './figures/cone-trunk'
import { Cube } from './figures/cube'
import { Cylinder } from './figures/cylinder'
import { Parallelepiped } from './figures/parallelepiped'
import { Pyramid } from './figures/pyramid'
import { Form } from './form'
import { Section } from './section'

const list = [
  { title: 'Cubo', component: Cube, figure: 'cubo' },
  {
    title: 'Paralelepípedo',
    component: Parallelepiped,
    figure: 'parallelepiped'
  },
  { title: 'Pirâmide', component: Pyramid, figure: 'pyramid' },
  { title: 'Cone', component: Cone, figure: 'cone' },
  { title: 'Cilindro', component: Cylinder, figure: 'cylinder' },
  { title: 'Tronco do cone', component: ConeTrunk, figure: 'cone-trunk' }
]

interface FiguresListProps {
  readonly filter: string
  readonly footer?: React.ReactNode
}

export function FiguresList(props: FiguresListProps) {
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

              if (figure === 'cone-trunk') {
                navigation.navigate('ConeTrunkForm')
              }
            }}
            leftContent={() => (
              <View style={{ marginRight: 8, paddingVertical: 4 }}>
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
