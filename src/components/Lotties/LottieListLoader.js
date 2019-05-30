import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';

const lottie = require('cnxapp/src/assets/lottie/circlelisload.json');

export default class LottieListLoader extends Component {
  state = { orientation: '' };

  getOrientation = () => {
    if (this.refs.rootView) { //eslint-disable-line
      if (Dimensions.get('window').width < Dimensions.get('window').height) {
        this.setState({ orientation: 'portrait' });
      } else {
        this.setState({ orientation: 'landscape' });
      }
    }
  };

  componentDidMount() {
    this.animation.play();
    this.getOrientation();
    Dimensions.addEventListener('change', () => {
      this.getOrientation();
    });
  }

  /* eslint-disable */
  render() {
    return (
      <View ref="rootView">
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent:'center'
          }}
        >
          <LottieView
            ref={animation => {
              this.animation = animation;
            }}
            style={{
              width: this.state.orientation === 'portrait' ? '30%' : '20%',
              marginTop: 40,
            }}
            loop
            source={lottie}
          />
          
        </View>
      </View>
    );
  }
}
