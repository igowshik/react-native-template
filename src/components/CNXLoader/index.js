import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

// Absolute imports
import * as Colors from 'cnxapp/src/utils/colorsConstants';

import Loader from './Loader';
const CNXLoader = props => {
  const { showLoader, loadingText, loaderStyle } = props;
  return (
    <Loader
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

CNXLoader.propTypes = {
  showLoader: PropTypes.bool.isRequired,
  loadingText: PropTypes.string,
  loaderStyle: PropTypes.object,
};

export default CNXLoader;
