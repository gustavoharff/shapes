import { useNavigation, useTheme } from '@react-navigation/native'
import * as React from 'react'
import {
  LayoutAnimation,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native'

import { Cone } from './figures/cone'
import { Cube } from './figures/cube'
import { Cylinder } from './figures/cylinder'
import { Parallelepiped } from './figures/parallelepiped'
import { Pyramid } from './figures/pyramid'

const list = [
  { title: 'Cone', component: Cone, figure: 'cone' },
  { title: 'Cubo', component: Cube, figure: 'cubo' },
  { title: 'Cilindro', component: Cylinder, figure: 'cylinder' },
  {
    title: 'Paralelepípedo',
    component: Parallelepiped,
    figure: 'parallelepiped'
  },
  { title: 'Pirâmide', component: Pyramid, figure: 'pyramid' }
]

interface FiguresListProps {
  readonly filter: string
  readonly style?: StyleProp<ViewStyle>
  readonly footer?: React.ReactNode
}

export function FiguresList(props: FiguresListProps) {
  const { filter, style, footer } = props

  const navigation = useNavigation()

  const theme = useTheme()

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
    <ScrollView contentInsetAdjustmentBehavior="automatic" style={style}>
      <View style={styles.list}>
        {data.map(({ title, component: Figure, figure }) => (
          <TouchableOpacity
            key={title}
            style={styles.figure}
            activeOpacity={0.7}
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
          >
            <Figure size={120} />

            <Text style={[{ color: theme.colors.text }, styles.title]}>
              {title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {footer}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  figure: {
    padding: 16,
    margin: 16,
    borderWidth: 1.5,
    borderRadius: 24,
    borderColor: '#5E66D7'
  },
  title: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500'
  }
})
