import React from 'react';
import { StatusBar, View } from 'react-native';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';
import * as colors from 'cnxapp/src/utils/colorsConstants';

import Loader from '../Loader';

class AuthLoadingScreen extends React.Component {
  constructor() {
    super();
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('@appusertoken');
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'App' : 'Auth'); //eslint-disable-line
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <Loader showLoader loaderTitle="Just makes work easier" />
        <StatusBar backgroundColor={colors.NAVHEADER} barStyle="default" />
      </View>
    );
  }
}

AuthLoadingScreen.propTypes = {
  navigation: PropTypes.any,
};

export default AuthLoadingScreen;
