import * as React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

import { RootStackScreenProps } from '../navigation/types'
import { Cube, Input } from '../ui'

type CubeFormProps = RootStackScreenProps<'CubeForm'>

interface CubeFormState {
  readonly edge: string
  readonly volume: number
}

export class CubeForm extends React.Component<CubeFormProps, CubeFormState> {
  private edgeRef = React.createRef<Input>()

  constructor(props: CubeFormProps) {
    super(props)

    this.state = {
      edge: '',
      volume: 0
    }
  }

  public componentDidMount() {
    this.edgeRef.current?.focus()
  }

  private onEdgeChange = (text: string) => {
    this.setState({ edge: text })

    if (!text) {
      this.setState({ volume: 0 })
      return
    }

    const number = Number(text.replace(',', '.'))

    const volume = number * number * number

    this.setState({ volume })
  }

  public render() {
    return (
      <ScrollView style={styles.form}>
        <View style={styles.cube}>
          <Cube size={120} />
        </View>

        <Input
          ref={this.edgeRef}
          placeholder="Aresta (cm)"
          value={this.state.edge}
          onChangeText={this.onEdgeChange}
          keyboardType="numeric"
        />
        <View style={styles.volume}>
          <Text style={styles.volumeText} numberOfLines={1}>
            Volume: {this.state.volume.toLocaleString('pt-BR')} cm³
          </Text>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  form: {
    padding: 16
  },
  cube: {
    alignItems: 'center'
  },
  volume: {
    marginTop: 24,
    backgroundColor: '#5E66D7',
    borderRadius: 8
  },
  volumeText: {
    textAlign: 'center',
    padding: 16,
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  }
})
