import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

// Absolute imports
import * as Colors from 'cnxapp/src/utils/colorsConstants';

import LottieLoader from './Loader';
const Loader = props => {
  const { showLoader, loadingText, loaderStyle } = props;
  return (
    <LottieLoader
      visible={showLoader}
      textContent={loadingText || 'Loading...'}
      textStyle={loaderStyle || styles.spinnerTextStyle}
    />
  );
};

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: Colors.primary,
  },
});

Loader.propTypes = {
  showLoader: PropTypes.bool.isRequired,
  loadingText: PropTypes.string,
  loaderStyle: PropTypes.object,
};

export default Loader;
