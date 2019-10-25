import React from 'react'
import {
  View,
  StyleSheet,
  Text
} from 'react-native'
import PubSub from '../lib/useState'

const windSpeeds = ['空挡', '低档', '中档', '高档']

export default class TopState extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      topFn: [
        { subject: 'wind_speed', name: '风速' },
        { subject: 'swinging_wind', name: '摆风' }
      ],
      speed: '--',
      swing: '--'
    }
    PubSub.subscribe('wind_speed', this.suber)
    PubSub.subscribe('swinging_wind', this.suber)
  }

  suber = (topic, data) => {
    switch (topic) {
      case 'wind_speed':
        this.setState({speed: windSpeeds[data.value]})
        break
      case 'swinging_wind':        
        this.setState({swing: data.value ? '开启' : '关闭'})
        break
    }
  }

  render () {
    const { topFn, speed, swing } = this.state
    return (
      <View style={styles.container}>
        {
          this.props.power && topFn.map((item, index) => {
            return (
              <View style={styles.content} key={index}>
                {index === 1 && <Text style={styles.separator}></Text>}
                <Text style={styles.txt}>{ item.name }: {item.subject === 'wind_speed' ? speed : swing}</Text>
              </View>
            )
          })
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  content: {
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center'
  },
  txt: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 13,
    color: '#999'
  },
  separator: {
    width: 1,
    height: 10,
    backgroundColor: '#999',
    marginHorizontal: 10
  }
})