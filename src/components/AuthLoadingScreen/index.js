import React from 'react';
import { StatusBar, View } from 'react-native';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';

import Loader from '../Loader';

class AuthLoadingScreen extends React.Component {
  constructor() {
    super();
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    // setTimeout(() => {
    //   this.props.navigation.navigate(userToken ? 'App' : 'Auth'); //eslint-disable-line
    // }, 3000);
    this.props.navigation.navigate(userToken ? 'App' : 'Auth'); //eslint-disable-line
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <Loader showLoader loadingText="BOAST gives users superpowers!!" />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

AuthLoadingScreen.propTypes = {
  navigation: PropTypes.any,
};

export default AuthLoadingScreen;
