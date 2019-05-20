import React from 'react';
import PropTypes from 'prop-types';
import {
  AsyncStorage,
  Button,
  StatusBar,
  View,
  StyleSheet,
} from 'react-native';

class OtherScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Button title="I'm done, sign me out" onPress={this._signOutAsync} />
        <StatusBar barStyle="default" />
      </View>
    );
  }

  _signOutAsync = async () => {
    const { navigation } = this.props;
    await AsyncStorage.clear();
    navigation.navigate('Auth');
  };
}

OtherScreen.propTypes = {
  navigation: PropTypes.any,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default OtherScreen;
