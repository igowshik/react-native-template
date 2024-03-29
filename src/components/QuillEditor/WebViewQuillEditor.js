import React from 'react';
import { View, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import PropTypes from 'prop-types';

import { WebView } from 'react-native-webview';
import config from 'cnxapp/src/config/config';

/*eslint-disable*/
const patchPostMessageFunction = function () {
  const originalPostMessage = window.ReactNativeWebView.postMessage;

  const patchedPostMessage = function (message, targetOrigin, transfer) {
    originalPostMessage(message, targetOrigin, transfer);
  };

  // patchedPostMessage.toString = function() {
  //   return String(Object.hasOwnProperty).replace(
  //     'hasOwnProperty',
  //     'postMessage',
  //   );
  // };


  window.ReactNativeWebView.postMessage = patchedPostMessage;
};
/* eslint-enable */

const patchPostMessageJsCode = `(${String(patchPostMessageFunction)})();`;

export default class WebViewQuillEditor extends React.Component {
  constructor() {
    super();
    this.webview = null;
    this.state = {
      value: '',
    };
  }

  componentDidMount = () => {};

  createWebViewRef = webview => {
    this.webview = webview;
  };

  handleMessage = event => {
    let msgData;
    try {
      msgData = JSON.stringify(event.nativeEvent.data, null, 2);
      this.setState({ value: msgData });
    } catch (err) {
      console.warn(err);//eslint-disable-line
    }
  };

  onWebViewLoaded = () => {
    const { contentToDisplay } = this.props;
    this.sendMessage(contentToDisplay);
  };

  getDelta = () => this.state.value;

  sendMessage = payload => {
    if (this.webview.postMessage) {
      this.webview.postMessage(payload);
    }
  };

  showLoadingIndicator = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator color="blue" />
    </View>
  );

  onError = error => {
    Alert.alert('WebView onError', error, [
      { text: 'OK', onPress: () => console.log('OK Pressed') },//eslint-disable-line
    ]);
  };

  renderError = error => {
    Alert.alert('WebView renderError', error, [
      { text: 'OK', onPress: () => console.log('OK Pressed') },//eslint-disable-line
    ]);
  };

  render = () => (
    <View style={{ flex: 1, overflow: 'hidden' }}>
      <WebView
        style={{ ...StyleSheet.absoluteFillObject }}
        ref={this.createWebViewRef}
        source={{
          uri: config.quillEditor,
        }}
        onLoadEnd={this.onWebViewLoaded}
        onMessage={this.handleMessage}
        startInLoadingState
        renderLoading={this.showLoadingIndicator}
        renderError={this.renderError}
        javaScriptEnabled
        onError={this.onError}
        mixedContentMode="always"
        domStorageEnabled
        injectedJavaScript={patchPostMessageJsCode}
        originWhitelist={['*']}
      />
    </View>
  );
}

WebViewQuillEditor.propTypes = {
  contentToDisplay: PropTypes.string,
};
