import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image, KeyboardAvoidingView, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withNavigation } from 'react-navigation';
import { compose } from 'redux';
import { Row, Grid } from 'react-native-easy-grid';

// Absolute imports
// import BackgroundImage from 'cnxapp/src/components/CNXBackgroundImage';
import CNXLoader from 'cnxapp/src/components/CNXLoader';

// Relative imports
import LoginForm from './LoginForm';
import { selectToken, selectLoader } from '../selectors';
import { getAccessToken, setLoaderValue } from '../actions';
import { styles } from '../styles';

const logo = require('cnxapp/src/assets/images/Boast_logo.png');
// const backgroundImage = require('cnxapp/src/assets/images/arrow.png');

class Login extends Component {
  constructor(props) {
    super(props);
    this._signInAsync = this._signInAsync.bind(this);
  }

  _signInAsync = async token => {
    const { navigation } = this.props;
    if (token) {
      await AsyncStorage.setItem('userToken', token);
      navigation.navigate('App');
    }
  };

  componentDidUpdate() {
    const { accessToken } = this.props;
    if (accessToken && accessToken !== '') this._signInAsync(accessToken);
  }

  handleUserLogin = (userName, password) => {
    const { getUserAccessTone, setLoaderState } = this.props;
    setLoaderState(true);
    getUserAccessTone(userName, password);
  };

  render() {
    const { loaderState } = this.props;
    return (
      // <BackgroundImage imageSource={backgroundImage}>
      <View style={styles.parentViewWrapper}>
        <KeyboardAvoidingView
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
          }}
          behavior="padding"
          enabled
          keyboardVerticalOffset={100}
        >
          <View style={styles.loginContainer}>
            <Grid>
              <Row style={styles.logoContainer} size={1}>
                <Image resizeMode="contain" style={styles.logo} source={logo} />
              </Row>
              <Row style={styles.fieldContainer} size={2}>
                <LoginForm onLogin={this.handleUserLogin} />
              </Row>
            </Grid>
          </View>
        </KeyboardAvoidingView>

        <CNXLoader showLoader={loaderState} loadingText="Signing in..." />
      </View>
      // </BackgroundImage>
    );
  }
}

Login.propTypes = {
  navigation: PropTypes.any,
  getUserAccessTone: PropTypes.func.isRequired,
  accessToken: PropTypes.string,
  loaderState: PropTypes.bool.isRequired,
  setLoaderState: PropTypes.func.isRequired,
};

/**
 * @method: mapStateToProps()
 * @description: Redux Map method to map all redux state into each individual state value
 * @returns: jobState ans filterState in the State
 */
const mapStateToProps = createStructuredSelector({
  accessToken: selectToken(),
  loaderState: selectLoader(),
});

/**
 * @method: mapDispatchToProps()
 * @description: Map the Props of this class to the respective Redux dispatch functions
 * @returns: Mapped functions
 */
const mapDispatchToProps = dispatch => ({
  getUserAccessTone: (userName, password) =>
    dispatch(getAccessToken(userName, password)),
  setLoaderState: value => dispatch(setLoaderValue(value)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withNavigation,
  withConnect,
)(Login);
