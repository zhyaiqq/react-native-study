/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('screen')

console.log(width, height)

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
interface State {
  waveStyle: Object
}
export default class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      waveStyle: {}
    }
  }
  onLayout = (e: any) => {
    this.setState({ waveStyle: { height: e.nativeEvent.layout.height - 400 + 20 }})
    console.log(e.nativeEvent.layout)
  }

  render() {
    return (
      <View style={styles.container} onLayout={this.onLayout}>
        <View style={styles.circle}></View>
        <View style={[styles.wave, this.state.waveStyle]}></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingTop: 200
  },
  circle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#ccc'
  },
  wave: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    height: 300,
    width: '100%'
  }
});
