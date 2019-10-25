import React from 'react'
import {
  View,
  StyleSheet,
  Image,
  Animated,
  Easing
} from 'react-native'
import PubSub from '../lib/useState'
import Img from '../assets/image'

const durations = [0, 1000, 500, 250] // 风速： 空低中高

interface Props {
  power: boolean
}
export default class Fan extends React.Component<Props> {
  constructor(props) {
    super(props)
    this.state = {
      deg: new Animated.Value(0),
      duration: 1000,
      power: props.power
    }
    PubSub.subscribe('wind_speed', this.suber)
  }

  suber = (topic, data) => {
    switch (topic) {
      case 'wind_speed':
        this.setState({duration: durations[data.value]}, () => this.start())
        break
    }
  }

  componentDidMount () {
    this.state.power && this.start()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.power !== this.state.power) {
      this.setState({ power: nextProps.power })
      nextProps.power ? this.start() : this.stop()
    }
  }

  start = () => {
    this.stop()
    this.animate = Animated.loop(
      Animated.timing(this.state.deg, {
        toValue: 1,
        duration: this.state.duration,
        easing: Easing.inOut(Easing.linear), // 这里不用inOut，执行完一次之后会有停顿，加上会比较顺畅
        useNativeDriver: true
      })
    )
    this.animate.start()
  }

  stop = () => {
    if (this.animate) {
      this.animate.stop()
      this.state.deg.setValue(0);
      this.animate = null
    }
  }

  render () {
    const { power } = this.state
    const deg = this.state.deg.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    })
    return (
      <View style={styles.container}>
        <Image source={{uri: Img.base}} resizeMode='cover' style={{height: 400, width: 214, position: 'absolute'}} />
        <Animated.Image
          source={{uri: Img.fan}}
          resizeMode='cover' 
          style={{height: 170, width: 170, position: 'absolute', top: 18, transform: [{rotate: deg}]}} />
        <Image source={{uri: power ? Img.open : Img.close}} resizeMode='cover' style={{height: 205, width: 205, position: 'absolute'}} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  }
})