import React from 'react';
import PropTypes from 'prop-types';
import { AsyncStorage, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withNavigation } from 'react-navigation';

import DashboardMainScreen from '../Dashboard';

class HomeScreen extends React.Component {
  state = {};

  _signOutAsync = async () => {
    const { navigation } = this.props;
    await AsyncStorage.clear();
    navigation.navigate('Auth');
  };

  render() {
    return (
      <View style={styles.mainViewMargin}>
        <DashboardMainScreen />
      </View>
    );
  }
}

HomeScreen.propTypes = {
  navigation: PropTypes.any,
};

const styles = StyleSheet.create({
  mainViewMargin: {},
});

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
