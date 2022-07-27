import * as React from 'react'
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

interface TipProps {
  readonly title: string
  readonly children: React.ReactNode
  readonly style?: StyleProp<ViewStyle>
}

export class Tip extends React.Component<TipProps> {
  public render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <View style={styles.border} />
        <View style={styles.tip}>
          <View style={styles.header}>
            <Icon name="information-outline" size={24} color="#fff" />
            <Text style={styles.title}>{this.props.title}</Text>
          </View>

          <View style={styles.content}>{this.props.children}</View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'rgba(94, 102, 215, 0.85)',
    borderRadius: 6
  },
  border: {
    width: 8,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    height: '100%',
    backgroundColor: 'rgb(129, 134, 214)'
  },
  tip: {
    flex: 1
  },
  header: {
    flexDirection: 'row',
    padding: 8,
    alignItems: 'center'
  },
  title: {
    marginLeft: 8,
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  },
  content: {
    paddingHorizontal: 8,
    paddingBottom: 8
  }
})
