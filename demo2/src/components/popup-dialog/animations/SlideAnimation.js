// flow

import { Animated, Easing } from 'react-native';
import Animation from './Animation';

export default class SlideAnimation extends Animation {
  constructor({
    toValue = 0,
    slideFrom = 'bottom',
    useNativeDriver = true,
  } = {}) {
    super({ toValue, useNativeDriver });
    this.animations = this.createAnimations(slideFrom);
  }

  toValue(toValue: number, onFinished?: Function = () => {}): void {
    Animated.timing(this.animate, {
      toValue,
      Duration: 150,
      ease: Easing.out(Easing.ease),
      useNativeDriver: this.useNativeDriver,
    }).start(onFinished);
  }

  createAnimations(slideFrom: string): Object {
    const transform = [];

    if (['top', 'bottom'].includes(slideFrom)) {
      if (slideFrom === 'bottom') {
        transform.push({
          translateY: this.animate.interpolate({
            inputRange: [0, 1],
            outputRange: [800, 1],
          }),
        });
      } else {
        transform.push({
          translateY: this.animate.interpolate({
            inputRange: [0, 1],
            outputRange: [-800, 1],
          }),
        });
      }
    } else if (['left', 'right'].includes(slideFrom)) {
      if (slideFrom === 'right') {
        transform.push({
          translateX: this.animate.interpolate({
            inputRange: [0, 1],
            outputRange: [800, 1],
          }),
        });
      } else {
        transform.push({
          translateX: this.animate.interpolate({
            inputRange: [0, 1],
            outputRange: [-800, 1],
          }),
        });
      }
    }

    const animations = {
      transform,
    };

    return animations;
  }
}
