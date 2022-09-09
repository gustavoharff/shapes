import * as React from 'react'
import {
  Appearance,
  NativeEventSubscription,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native'
import Collapsible from 'react-native-collapsible'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { theme } from '../theme'

interface TipProps {
  readonly title: string
  readonly children: React.ReactNode
  readonly style?: StyleProp<ViewStyle>
}

interface TipState {
  readonly isDark: boolean
  readonly isCollapsed: boolean
}

export class Tip extends React.Component<TipProps, TipState> {
  private colorSchemeSubscription: NativeEventSubscription | null = null

  constructor(props: TipProps) {
    super(props)

    this.state = {
      isDark: Appearance.getColorScheme() === 'dark',
      isCollapsed: false
    }
  }

  componentDidMount() {
    this.colorSchemeSubscription = Appearance.addChangeListener(
      this.onColorSchemeChange
    )
  }

  componentWillUnmount() {
    this.colorSchemeSubscription?.remove()
  }

  private onColorSchemeChange: Appearance.AppearanceListener = preference => {
    this.setState({ isDark: preference.colorScheme === 'dark' })
  }

  public render() {
    const { isDark } = this.state
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: isDark ? theme.dark.primary : theme.light.primary,
            borderLeftColor: isDark
              ? theme.dark.primaryVariant
              : theme.light.primaryVariant
          },
          this.props.style
        ]}
      >
        <View style={styles.header}>
          <Icon name="information-outline" size={24} color="#fff" />
          <Text style={styles.title}>{this.props.title}</Text>

          <TouchableOpacity activeOpacity={0.9} style={{ marginLeft: 'auto' }}>
            <Icon
              name={this.state.isCollapsed ? 'chevron-up' : 'chevron-down'}
              size={24}
              color="#fff"
              onPress={() =>
                this.setState({ isCollapsed: !this.state.isCollapsed })
              }
            />
          </TouchableOpacity>
        </View>

        {/* @ts-expect-error types definition for collapsible doesnt include children prop */}
        <Collapsible collapsed={this.state.isCollapsed}>
          <View style={styles.content}>{this.props.children}</View>
        </Collapsible>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(94, 102, 215, 0.85)',
    borderRadius: 6,
    borderLeftWidth: 8
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
