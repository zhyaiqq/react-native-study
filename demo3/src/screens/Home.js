import React, { PureComponent } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet
} from 'react-native'
import RefreshListView from '../components/refreshListView'
export default class IndexPage extends PureComponent{
  render() {
    return (
      <View style={styles.container}>
        <RefreshListView />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    backgroundColor: '#F4F4F4'
  }
})