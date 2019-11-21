/**
 * 封装一个头部固定的组件
 * 
 * ios下滚动每个头部默认固定
 * Android下需要加stickySectionHeadersEnabled配置才行
 */
import React, { PureComponent } from 'react'
import {
  SectionList,
  View,
  StyleSheet,
  Text,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native'

export const RefreshState = {
  Idle: 0,
  HeaderRefreshing: 1,
  FooterRefreshing: 2,
  NoMoreData: 3,
  Failure: 4,
  EmptyData: 5
}
export default class RefreshListView extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      refreshState: RefreshState.Idle
    }
  }

  // 上拉加载更多
  onEndReached = () => {
    if (this.shouldStartFooterRefreshing()) {
      console.log('onEndReached')
      this.setState({
        refreshState: RefreshState.FooterRefreshing
      })
    }
  }

  // 下拉刷新
  onRefresh = () => {
    if (this.shouldStartHeaderRefreshing()) {
      console.log('onRefresh')
      this.setState({
        refreshState: RefreshState.HeaderRefreshing
      })
    }
  }

  // 当refreshState 为HeaderRefreshing或者为FooterRefreshing是不执行HeaderRefreshing
  shouldStartHeaderRefreshing = () => {
    const { refreshState } = this.state
    if (refreshState == RefreshState.HeaderRefreshing || refreshState == RefreshState.FooterRefreshing) {
      return false
    } else {
      return true
    }
  }

  // 当数据为空时不执行尾部刷新
  shouldStartFooterRefreshing = () => {
    const { refreshState, data } = this.state
    if (data.length == 0){
      return false
    }
    return (refreshState === RefreshState.Idle)
  }

  // 渲染尾部组件
  ListFooterComponent = () => {
    let footer = null
    const {
      refreshState
    } = this.state
    switch (refreshState) {
      case RefreshState.Idle:
        footer = (<View style={styles.footerContainer}></View>)
        break
      case RefreshState.FooterRefreshing:
        footer = (
          <View style={styles.footerContainer}>
            <ActivityIndicator size="small" color="#888888" />
            <Text style={[styles.footerText, {marginLeft: 10}]}>加载中……
          </Text></View>
        )
        break
      case RefreshState.NoMoreData:
        footer = (<View style={styles.footerContainer}><Text>没有更多了</Text></View>)
        break
      case RefreshState.Failure:
        footer = (
          <View style={styles.footerContainer}>
            <TouchableOpacity>
              <Text>加载失败，点击重试！</Text>
            </TouchableOpacity>
          </View>
        )
        break
      case RefreshState.EmptyData:
        footer = (<View><Text>没有数据</Text></View>)
        break
    }
    return footer
  }

  list
  render () {
    const data = [
      {title: '今天', data: ["item1", "item2", "item3", "item4"]},
      {title: '昨天', data: ["item1", "item2", "item3", "item4"]},
      {title: '2019.09.14', data: ["item1", "item2", "item3", "item4"]},
      {title: '2019.09.13', data: ["item1", "item2", "item3", "item4"]},
      {title: '2019.09.12', data: ["item1", "item2", "item3", "item4"]}
    ]
    const { refreshState } = this.state
    return (
      <SectionList
        refreshControl={
          <RefreshControl
            refreshing={refreshState == RefreshState.HeaderRefreshing}
            onRefresh={this.onRefresh}
          />
        }
        stickySectionHeadersEnabled
        renderItem={({ item, index, section }) => <Text style={styles.item} key={index}>{item}</Text>}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.title}>{title}</Text>
        )}
        sections={data}
        keyExtractor={(item, index) => item + index}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={0.1}
        ListFooterComponent={this.ListFooterComponent}
        ListEmptyComponent={<Text>空</Text>}
      />
    )
  }
}

const styles = StyleSheet.create({
  footerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    height: 40
  },
  footerText: {
    fontSize: 12
  },
  item: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    padding: 15,
    borderRadius: 5
  },
  title: {
    paddingLeft: 15,
    height: 40,
    lineHeight: 40,
    backgroundColor: '#f4f4f4',
    zIndex: 10
  }
})