// Needed for redux-saga es6 generator support
import React from 'react';
import { Provider } from 'react-redux';
import { StyleProvider } from 'native-base';
import { Provider as PaperProvider } from 'react-native-paper';

import Store from '../configureStore';
import StoreWrappedApp from './components/StoreWrappedApp';
import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/material';

const App = () => (
  <PaperProvider>
    <StyleProvider style={getTheme(material)}>
      <Provider store={Store}>
        <StoreWrappedApp />
      </Provider>
    </StyleProvider>
  </PaperProvider>
);

export default App;
