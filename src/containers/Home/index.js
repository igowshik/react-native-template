import React from 'react';
import PropTypes from 'prop-types';
import { View, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withNavigation } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';

import DashboardMainScreen from '../Dashboard';

class HomeScreen extends React.Component {
  _signOutAsync = async () => {
    const { navigation } = this.props;
    await AsyncStorage.clear();
    navigation.navigate('Auth');
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="default" />
        <DashboardMainScreen />
      </View>
    );
  }
}

HomeScreen.propTypes = {
  navigation: PropTypes.any,
};

/**
 * @method: mapStateToProps()
 * @description: Redux Map method to map all redux state into each individual state value
 * @returns: jobState ans filterState in the State
 */
const mapStateToProps = state => ({
  rootState: state.rootState,
});

/**
 * @method: mapDispatchToProps()
 * @description: Map the Props of this class to the respective Redux dispatch functions
 * @returns: Mapped functions
 */
const mapDispatchToProps = dispatch => ({ //eslint-disable-line

});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withNavigation,
  withConnect,
)(HomeScreen);
