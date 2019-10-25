import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing
} from 'react-native'
import PubSub from '../lib/useState'

import SVG from '../components/svg'

const defaultColor = '#fff'
const forbidColor = '#555'
const activeColor = '#19BBFF'

class Sheet extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      windSpeed: ['空挡', '低档', '中档', '高档'],
      ani: new Animated.Value(85),
      current: ''
    }
    PubSub.subscribe('bottomSheet', this.suber)
  }

  suber = (topic, data) => {
    switch(topic) {
      case 'bottomSheet':
        data.value ? this.show() : this.hide()
        break;
    }
  }

  show = () => {
    Animated.timing(this.state.ani, {
      toValue: 0,
      duration: 100,
      easing: Easing.linear
    }).start()
  }

  hide = () => {
    Animated.timing(this.state.ani, {
      toValue: 85,
      duration: 100,
      easing: Easing.linear
    }).start()
  }

  select = (index) => {
    this.setState({current: index})
    PubSub.publish('wind_speed', {value: index})
  }

  render() {
    const { windSpeed, ani, current } = this.state
    return (
      <Animated.View style={[styles.sheet, {transform: [{translateY: ani}]}]}>
        <View style={styles.sheetCon}>
          {windSpeed.map((item, index) => {
            return <TouchableOpacity onPress={() => this.select(index)} activeOpacity={0.7} key={index}>
            <Text style={[styles.sheetTxt, {backgroundColor: current === index ? '#5ABBF9' : 'transparent'}]} key={index}>{item}</Text>
            </TouchableOpacity>

          })}
        </View>
        <TouchableOpacity onPress={this.props.hide} style={{padding: 10}} activeOpacity={0.7}>
          <SVG icon="arrow" size={12} />
        </TouchableOpacity>
      </Animated.View>
    )
  }
}

interface ItemProps {
  fn: object,
  power: boolean
}
class Item extends React.Component<ItemProps> {
  constructor(props) {
    super(props)
    this.state = {
      power: props.power,
      fn: props.fn,
      on_off: false,
      sheet: false
    }
    PubSub.subscribe(props.fn.subject, this.suber)
  }

  suber = (topic, data) => {
    switch(topic) {
      case 'wind_speed':
        this.setState({on_off: data.value === 0 ? false : true})
        break
      case 'swinging_wind':
        this.setState({on_off: data.value})
        break
      case 'timing_close':
        this.setState({on_off: data.value === 0 ? false : true})
        break
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.power !== this.props.power) {
      this.setState({ power: nextProps.power })
    }
  }

  onPress = () => {
    const { fn, on_off, sheet } = this.state
    
    // 下发命令
    if (fn.subject === "switch") {
      PubSub.publish(fn.subject, { value: !on_off })
      this.setState({ on_off: !on_off })
    }
    if (fn.subject === "wind_speed") {
      this.props.toggle && this.props.toggle()
    }
    if (fn.subject === "timing_close") PubSub.publish('sheet', {value: true})
    if (fn.subject === "swinging_wind") PubSub.publish('swinging_wind', {value: !on_off})
  }

  render() {
    const { fn, power, on_off } = this.state
    let color = forbidColor
    let txt = ''
    switch (fn.subject) {
      case "switch":
        color = power ? activeColor : defaultColor
        txt = power ? '关闭' : '开启'
        break;
      default:
        color = power ? (on_off ? activeColor : defaultColor) : forbidColor
        txt = fn.name
        break;
    }
    return (
      <TouchableOpacity onPress={fn.subject === "switch" ? this.onPress : (power ? this.onPress : null)} activeOpacity={fn.subject === "switch" ? 0.6 : (power ? 0.6 : 1)}>
        <View style={styles.item}>
          <SVG icon={fn.subject} size={25} color={color} />
          <Text style={[styles.txt, { color: color }]}>{txt}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

interface Props { }
export default class BottomTab extends React.Component<Props> {
  constructor(props) {
    super(props)
    this.state = {
      tabs: [
        { subject: 'switch', name: '开关' },
        { subject: 'wind_speed', name: '风速' },
        { subject: 'swinging_wind', name: '摆风' },
        { subject: 'timing_close', name: '定时关闭' }
      ],
      sheet: false
    }
  }

  toggleSheet = () => {
    const { sheet } = this.state
    sheet ? this.refs.sheet.hide() : this.refs.sheet.show()
    this.setState({sheet: !sheet})
  }

  hideSheet = () => {
    this.setState({sheet: false})
    this.refs.sheet.hide()
  }

  render() {
    const { tabs } = this.state
    return (
      <View style={styles.container}>
        <Sheet ref="sheet" hide={this.hideSheet} />
        <View style={styles.tab}>
          {tabs.map((item, index) => <Item key={index} fn={item} power={this.props.power} toggle={this.toggleSheet} />)}
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    // width: '100%',
    // height: 70,
    // flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#282E3A'
  },
  tab: {
    width: '100%',
    height: 70,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#282E3A'
  },
  item:{
    paddingHorizontal: 30,
    alignItems: 'center'
  },
  txt: {
    marginTop: 8,
    fontSize: 12,
    fontFamily: 'PingFangSC-Regular'
  },
  sheet: {
    width: '100%',
    height: 85,
    alignItems: 'center',
    paddingTop: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.1)'
  },
  sheetCon: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  sheetTxt: {
    width: 60,
    height: 25,
    borderRadius: 13,
    color: '#FFFEFE',
    marginHorizontal: 10,
    textAlign: 'center',
    lineHeight: 25
  }
})