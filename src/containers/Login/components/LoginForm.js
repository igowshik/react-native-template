import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, StyleSheet, StatusBar } from 'react-native';

// Absolute imports
import { PrimaryButtonGradient } from 'cnxapp/src/components/Buttons/Primary';

class LoginForm extends Component {
  state = {
    userName: '',
    password: '',
  };
  // state = {
  //   userName: '',
  //   password: '',
  // };

  _handleUserLogin = () => {
    const { onLogin } = this.props;
    const { userName, password } = this.state;
    onLogin(userName, password);
  };

  render() {
    const { userName, password } = this.state;
    return (
      <View>
        <StatusBar barStyle="default" backgroundColor="#6F5CEC" />
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          onSubmitEditing={() => this.passwordInput.focus()}
          autoCorrect={false}
          keyboardType="email-address"
          returnKeyType="next"
          placeholder="Email"
          placeholderTextColor="#000"
          blurOnSubmit={false}
          value={userName}
          onChangeText={value => {
            this.setState({ userName: value });
          }}
        />
        <TextInput
          style={styles.input}
          ref={input => {
            this.passwordInput = input;
          }}
          returnKeyType="go"
          placeholder="Password"
          placeholderTextColor="#000"
          secureTextEntry
          value={password}
          onChangeText={value => {
            this.setState({ password: value });
          }}
        />
        <View style={styles.buttonContainer}>
          <PrimaryButtonGradient
            handleButtonClick={this._handleUserLogin}
            buttonText="Login"
            style={{ margin: 50 }}
          />
        </View>
      </View>
    );
  }
}

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

// define your styles
const styles = StyleSheet.create({
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#07016f',
    backgroundColor: 'rgba(255, 255, 255,0)',
    height: 40,
    marginHorizontal: 20,
    borderRadius: 5,
    color: '#000',
  },
  buttonContainer: {
    marginHorizontal: 20,
  },
});

export default LoginForm;
