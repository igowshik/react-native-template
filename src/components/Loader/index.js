import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Paragraph,
  Portal,
  Dialog,
  ActivityIndicator,
} from 'react-native-paper';
import PropTypes from 'prop-types';
import * as colors from 'cnxapp/src/utils/colorsConstants';
import { BlurView } from '@react-native-community/blur';

// const isIOS = Platform.OS === 'ios';
class Loader extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { viewRef: null };
  }

  render() {
    const { showLoader, loadingText, loaderTitle } = this.props;
    return (
      <Portal>
        {showLoader ? (
          <BlurView
            style={styles.absolute}
            viewRef={this.state.viewRef}
            blurType="light"
            blurAmount={4}
          />
        ) : null}
        <Dialog visible={showLoader}>
          <Dialog.Title>{loaderTitle || 'Progress'}</Dialog.Title>
          <Dialog.Content>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <ActivityIndicator
                color={colors.PURPLE}
                size={30}
                style={{ marginRight: 16 }}
              />
              <Paragraph>{loadingText || 'Loading...'}</Paragraph>
            </View>
          </Dialog.Content>
        </Dialog>
      </Portal>
    );
  }
}

Loader.propTypes = {
  showLoader: PropTypes.bool.isRequired,
  loadingText: PropTypes.string,
  loaderTitle: PropTypes.string,
};

const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default Loader;
