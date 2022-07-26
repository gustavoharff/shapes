import * as React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

import { RootStackScreenProps } from '../navigation/types'
import { Cube, Input } from '../ui'

type CubeFormProps = RootStackScreenProps<'CubeForm'>

interface CubeFormState {
  readonly edge: string
  readonly volumeCm3: number
  readonly volumeMm3: number
  readonly specificWeight: string
  readonly weightCm3: number
  readonly weightMm3: number
}

export class CubeForm extends React.Component<CubeFormProps, CubeFormState> {
  private edgeRef = React.createRef<Input>()

  constructor(props: CubeFormProps) {
    super(props)

    this.state = {
      edge: '',
      volumeCm3: 0,
      volumeMm3: 0,
      specificWeight: '',
      weightCm3: 0,
      weightMm3: 0
    }
  }

  public componentDidMount() {
    this.edgeRef.current?.focus()
  }

  private onEdgeChange = (text: string) => {
    this.setState({ edge: text })

    if (!text) {
      this.setState({
        volumeCm3: 0,
        volumeMm3: 0,
        weightCm3: 0,
        weightMm3: 0,
        specificWeight: ''
      })
      return
    }

    const number = Number(text.replace(',', '.'))

    const volumeCm3 = number * number * number
    const volumeMm3 = volumeCm3 * 1000

    this.setState({ volumeCm3, volumeMm3 })
  }

  private onSpecificWeightChange = (text: string) => {
    this.setState({ specificWeight: text })

    const number = Number(text.replace(',', '.'))

    const weightCm3 = number / this.state.volumeCm3
    const weightMm3 = number / this.state.volumeMm3

    this.setState({ weightCm3, weightMm3 })
  }

  public render() {
    return (
      <ScrollView
        style={styles.form}
        contentInsetAdjustmentBehavior="automatic"
      >
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
        <View style={styles.tip}>
          <Text style={styles.tipTitle}>Volume</Text>
          <Text style={styles.tipValue}>
            {this.state.volumeCm3.toLocaleString('pt-BR')} cm³
          </Text>
          <Text style={styles.tipValue}>
            {this.state.volumeMm3.toLocaleString('pt-BR')} mm³
          </Text>
        </View>

        <Input
          placeholder="Peso especifico (kg/cm³)"
          value={this.state.specificWeight}
          onChangeText={this.onSpecificWeightChange}
          keyboardType="numeric"
          editable={!!this.state.edge}
          style={{ marginTop: 16 }}
        />

        <View style={styles.tip}>
          <Text style={styles.tipTitle}>Peço</Text>
          <Text style={styles.tipValue}>
            {this.state.weightCm3.toLocaleString('pt-BR')} kg/cm³
          </Text>
          <Text style={styles.tipValue}>
            {this.state.weightMm3.toLocaleString('pt-BR', {
              maximumSignificantDigits: 6
            })}{' '}
            kg/mm³
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
  tip: {
    marginTop: 24,
    backgroundColor: 'rgba(94, 102, 215, 0.85)',
    padding: 16,
    borderRadius: 8
  },
  tipTitle: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    paddingVertical: 4
  },
  tipValue: {
    textAlign: 'center',
    color: '#ebeaea',
    fontSize: 16,
    fontWeight: '600',
    paddingVertical: 4
  }
})
