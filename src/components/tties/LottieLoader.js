import React, { Component } from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';

const lottie = require('./node_modules/cnxapp/src/assets/lottie/circleloading.json.js');

export default class LottieLoader extends Component {
  componentDidMount() {
    this.animation.play();
  }

  render() {
    return (
      <View
        style={{
          width: 180,
          height: 180,
        }}
      >
        <LottieView
          ref={animation => {
            this.animation = animation;
          }}
          loop
          source={lottie}
        />
      </View>
    );
  }
}
