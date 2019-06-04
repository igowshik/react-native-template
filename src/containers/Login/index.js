import React from 'react';
import { DynamicModuleLoader } from 'redux-dynamic-modules';

import { Platform } from 'react-native';
import Login from './components/Login';
import { getLoginModule } from './module';

class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome to BOAST',
    headerStyle: {
      backgroundColor: '#6F5CEC',
    },
    headerTitleStyle: {
      fontFamily: Platform.OS === 'ios' ? 'Montserrat' : 'Montserrat-Regular',
      fontWeight: '400',
      fontSize: 25,
      flexGrow: 1,
      textAlign: 'center',
      color: '#fff',
    },
  };

  render() {
    return (
      <DynamicModuleLoader modules={[getLoginModule()]}>
        <Login />
      </DynamicModuleLoader>
    );
  }
}

export default LoginScreen;
