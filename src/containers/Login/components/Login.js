import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withNavigation } from 'react-navigation';
import { compose } from 'redux';
import { Row, Grid } from 'react-native-easy-grid';
import AsyncStorage from '@react-native-community/async-storage';

// Absolute imports
import BackgroundImage from 'cnxapp/src/components/BackgroundImage';
import Loader from 'cnxapp/src/components/Loader';
import Snackbar from 'cnxapp/src/components/Snackbar';

// Relative imports
import {
  selectToken,
  selectLoader,
  selectToastVisibility,
  selectToastData,
} from '../selectors';
import { getAccessToken, setLoaderValue } from '../actions';
import { styles } from '../styles';

// Components
import LoginForm from './LoginForm';

const logo = require('cnxapp/src/assets/images/Boast_logo.png');
const backgroundImage = require('cnxapp/src/assets/images/login.png');

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
    const { loaderState, toastVisible, toast } = this.props;
    return (
      <BackgroundImage imageSource={backgroundImage}>
        <View style={styles.parentViewWrapper}>
          <KeyboardAvoidingView
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
            }}
            behavior="padding"
            enabled
            keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : -300}
          >
            <View style={styles.loginContainer}>
              <Grid>
                <Row style={styles.logoContainer} size={1}>
                  <Image
                    resizeMode="contain"
                    style={styles.logo}
                    source={logo}
                  />
                </Row>
                <Row style={styles.fieldContainer} size={2}>
                  <LoginForm onLogin={this.handleUserLogin} />
                </Row>
              </Grid>
            </View>
          </KeyboardAvoidingView>
          <Snackbar toastVisible={toastVisible} toast={toast} />
          <Loader
            showLoader={loaderState}
            loaderTitle="Signing in"
            loadingText="Loading..."
          />
        </View>
      </BackgroundImage>
    );
  }
}

Login.propTypes = {
  navigation: PropTypes.any,
  getUserAccessTone: PropTypes.func.isRequired,
  accessToken: PropTypes.string,
  loaderState: PropTypes.bool.isRequired,
  setLoaderState: PropTypes.func.isRequired,
  toastVisible: PropTypes.bool.isRequired,
  toast: PropTypes.object.isRequired,
};

/**
 * @method: mapStateToProps()
 * @description: Redux Map method to map all redux state into each individual state value
 * @returns: jobState ans filterState in the State
 */
const mapStateToProps = createStructuredSelector({
  accessToken: selectToken(),
  loaderState: selectLoader(),
  toastVisible: selectToastVisibility(),
  toast: selectToastData(),
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
