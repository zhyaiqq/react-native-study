import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Animated,
  Easing,
  Button,
  ScrollView,
  Dimensions
} from 'react-native'
import PubSub from '../lib/useState'

// import PopupDialog from './popup-dialog'
import PopupDialog, { SlideAnimation } from 'react-native-popup-dialog'

const {width} = Dimensions.get('window')

export default class ActionSheet extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      visible: false,
      title: '标题',
      arr: ['不设置', '1小时', '2小时', '3小时'],
      current: '',
      store: ''
    }
    PubSub.subscribe('sheet', this.suber)
  }

  suber = (topic, data) => {
    this.setState({visible: data.value})
  }

  hide = () => {
    this.setState({visible: false})
  }

  confirm = () => {
    // 下发命令
    PubSub.publish('timing_close', {value: this.state.current})
    this.setState({store: this.state.current})
    this.hide()
  }

  select = (index) => {
    this.setState({current: index})
  }

  render () {
    const { arr, current } = this.state
    return (
      <PopupDialog
        ref={(popupDialog) => { this.popupDialog = popupDialog; }}
        width={width}
        height={300}
        onDismiss={this.hide}
        visible={this.state.visible}
        dialogStyle={{ backgroundColor: "#fff", borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
        containerStyle={{ justifyContent: "flex-end" }}
        onTouchOutside={() => {
          this.setState({ visible: false, current: this.state.store })
        }}
        dialogAnimation={new SlideAnimation({ slideFrom: "bottom" })}
        dialogTitle={
          <View style={styles.titleBox}>
            <Text style={styles.titleText}>{this.state.title}</Text>
          </View>
        }>
        <ScrollView contentContainerStyle={styles.content}>
          {arr.map((item, index) => {
            return <TouchableHighlight onPress={() => this.select(index)} style={[styles.contentItem, current === index ? {backgroundColor: '#F7F7F7'} : null]} key={index} underlayColor="#F7F7F7">
              <Text>{item}</Text>
            </TouchableHighlight>
          })}
        </ScrollView>
        <View style={styles.bottomBox}>
          <TouchableHighlight onPress={this.confirm} style={styles.bottomBtn} underlayColor="#F7F7F7">
            <Text>完成</Text>
          </TouchableHighlight>
        </View>
      </PopupDialog>
    )
  }
}

const styles = StyleSheet.create({
  titleBox: {
    width: '100%',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc'
  },
  titleText: {

  },
  content: {
    width: '100%',
    flex: 1,
    backgroundColor: '#fff'
  },
  contentItem: {
    width: width,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomBox: {
    width: width,
    height: 60,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomBtn: {
    width: width,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center'
  }
})