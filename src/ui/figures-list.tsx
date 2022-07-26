import { useNavigation } from '@react-navigation/native'
import * as React from 'react'
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'

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
    title: 'Paralelepipedo',
    component: Parallelepiped,
    figure: 'parallelepiped'
  },
  { title: 'Piramide', component: Pyramid, figure: 'pyramid' }
]

export function FiguresList() {
  const navigation = useNavigation()

  return (
    <ScrollView>
      <View style={styles.list}>
        {list.map(({ title, component: Figure, figure }) => (
          <TouchableOpacity
            key={title}
            style={styles.figure}
            activeOpacity={0.7}
            onPress={() => {
              if (figure === 'cubo') {
                navigation.navigate('CubeForm')
              }
            }}
          >
            <Figure size={120} />
          </TouchableOpacity>
        ))}
      </View>
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
  }
})
