import * as React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'

import { Cone } from './figures/cone'
import { Cube } from './figures/cube'
import { Cylinder } from './figures/cylinder'
import { Parallelepiped } from './figures/parallelepiped'
import { Pyramid } from './figures/pyramid'

const list = [
  { title: 'Cone', component: Cone },
  { title: 'Cubo', component: Cube },
  { title: 'Cilindro', component: Cylinder },
  { title: 'Paralelepipedo', component: Parallelepiped },
  { title: 'Piramide', component: Pyramid }
]

export function FiguresList() {
  return (
    <ScrollView>
      <View style={styles.list}>
        {list.map(({ title, component: Figure }) => (
          <View key={title} style={styles.figure}>
            <Figure size={120} />
          </View>
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
