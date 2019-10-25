import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  Image,
  Platform,
  StatusBar
} from 'react-native'
import  Img from '../assets/image'
import PubSub from '../lib/useState'

import TopState from '../components/topState'
import Timing from '../components/timing'
import Fan from '../components/fan'
import BottomTab from '../components/bottomTab'
import ActionSheet from '../components/actionSheet'

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    headerTitle: <Text style={{color: '#fff', width: '100%', textAlign: 'center'}}>title</Text>
  }

  constructor (props) {
    super(props)
    this.state = {
      power: false
    }
    PubSub.subscribe('switch', this.suber)
  }

  suber = (topic, data) => {
    console.log('suber', data)
    this.setState({power: data.value})
  }

  render() {
    const { power } = this.state
    return (
      <ImageBackground source={{uri: Img.bg}} style={{flex: 1}} resizeMode='cover'>
        <StatusBar
          animated={true}
          hidden={false}
          backgroundColor={'transparent'}
          translucent={true}
          barStyle={'light-content'} // enum('default', 'light-content', 'dark-content')   
        />
        <SafeAreaView style={{flex: 1}}>
          <View style={styles.container}>
            <TopState power={power} />
            <Timing power={power} />
            <Fan power={power} />
          </View>
        </SafeAreaView>
        <BottomTab power={ power }/>
        <ActionSheet />
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Platform.select({
      ios: {
        paddingTop: 40
      },
      android: {
        paddingTop: 40 + StatusBar.currentHeight
      }
    }),
    alignItems: 'center'
  }
})