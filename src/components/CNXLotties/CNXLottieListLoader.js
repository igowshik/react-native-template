import React, { Component } from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';

const lottie = require('cnxapp/src/assets/lottie/listloading.json');

export default class CNXLottieListLoader extends Component {
  componentDidMount() {
    this.animation.play();
  }

  render() {
    return (
      <View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            alignContent: 'center',
            justifyContent: 'center',
          }}
        >
          <LottieView
            ref={animation => {
              this.animation = animation;
            }}
            style={{
              width: '50%',
            }}
            loop
            source={lottie}
          />
        </View>
      </View>
    );
  }
}
