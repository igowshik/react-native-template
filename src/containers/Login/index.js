import React from 'react';
import { DynamicModuleLoader } from 'redux-dynamic-modules';

import Login from './components/Login';
import { getLoginModule } from './module';

class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome to Conexus Platform',
    headerStyle: {
      backgroundColor: '#FFF',
    },
    headerTitleStyle: {
      fontFamily: 'Montserrat',
      fontWeight: '400',
      fontSize: 25,
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
