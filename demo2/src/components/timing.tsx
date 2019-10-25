import React from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import PubSub from '../lib/useState'
import Img from '../assets/image'
import SVG from '../components/svg'


const times = ['不设置', '1小时', '2小时', '3小时']

interface Props {
  power: boolean
}
export default class Timing extends React.Component<Props> {
  constructor (props) {
    super(props)
    this.state = {
      value: ''
    }
    PubSub.subscribe('timing_close', this.suber)
  }

  suber = (topic, data) => {
    this.setState({value: data.value})
  }

  render () {
    const { power } = this.props
    return (
      <View style={styles.container}>
        {this.state.value && power ? <View style={styles.content}>
          <SVG icon="timing_close" color="#999DA4" style={{marginRight: 5}} />
          <Text style={styles.txt}>{times[this.state.value]}后关闭</Text>
        </View> : null}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 30,
    marginBottom: 20
  },
  content: {
    width: '100%',
    height: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  txt: {
    color: '#999DA4',
    fontSize: 13
  }
})