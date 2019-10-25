/**
 * @formats
 * @flow
 */
import { useState, useEffect } from 'react';
export class PS extends Object {
  subscriber = {}
  cache = {}
  /**
   * 订阅
   * @param {string} topic
   * @param {function} susbscriber 
   */
  subscribe(topic, subscriber) {
    if (!this.subscriber[topic]) this.subscriber[topic] = new Set()
    this.subscriber[topic].add(subscriber)
  }
  /**
   * 发布
   * @param {string} topic 
   * @param {any} msg 
   * @param {bool} sync 是否同步通知订阅者
   */
  publish(topic, msg, sync) {
    this.cache[topic] = msg
    if (sync) this._notify(topic, msg)
    else setImmediate(() => {
      this._notify(topic, msg)
    })
  }
  /**
   * 通知订阅者
   * @param {string} topic 
   * @param {any} msg 
   */
  _notify(topic, msg) {
    this.cache[topic] = msg
    const subscriberSet = this.subscriber[topic]
    if (!subscriberSet) return;
    subscriberSet.forEach((func) => {
      func(topic, msg)
    })
  }
  /**
   * 取消订阅
   * @param {string} topic 
   * @param {function} subscriber 
   * 
   * @example
   * PS.unsubscribe('topic', subscriberFunc) // 取消某个topic的订阅
   * PS.unsubscribe(subscriberFunc) // 取消所有topic的订阅
   */
  unsubscribe(topic, subscriber) {
    if (typeof topic === 'string') {
      let _set = this.subscriber[topic]
      _set && _set.delete(subscriber)
    } else {
      Object.keys(this.subscriber).forEach((t) => {
        let _set = this.subscriber[t]
        _set && _set.has(topic) &&  _set.delete(topic)
      })
    }
  }
  /**
   * 获取当前topic的值
   * @param {string} topic 
   */
  get(topic) {
    return this.cache[topic]
  }
  /**
   * 释放
   */
  dispose() {
    this.cache = {}
    this.subscriber = {}
  }
}

const PubSub = new PS()

export function useStateOf(topic) {
  const [value, setValue] = useState(PubSub.get(topic));

  useEffect(() => {
    function handleChange(topic, msg) {
      setValue(msg);
    }
    PubSub.subscribe(topic, handleChange);
    return () => {
      PubSub.unsubscribe(topic, handleChange);
    };
  });

  return value;
}

export default PubSub
