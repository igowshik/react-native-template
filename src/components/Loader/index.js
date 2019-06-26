import React from 'react';
import { ActivityIndicator, Platform, View } from 'react-native';
import { Paragraph, Portal, Dialog } from 'react-native-paper';
import PropTypes from 'prop-types';
import * as colors from 'cnxapp/src/utils/colorsConstants';

const isIOS = Platform.OS === 'ios';

const Loader = props => {
  const { showLoader, loadingText, loaderTitle } = props;
  return (
    <Portal>
      <Dialog visible={showLoader}>
        <Dialog.Title>{loaderTitle || 'Progress'}</Dialog.Title>
        <Dialog.Content>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <ActivityIndicator
              color={colors.PRIMARY}
              size={isIOS ? 'large' : 48}
              style={{ marginRight: 16 }}
            />
            <Paragraph>{loadingText || 'Loading...'}</Paragraph>
          </View>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};

Loader.propTypes = {
  showLoader: PropTypes.bool.isRequired,
  loadingText: PropTypes.string,
  loaderTitle: PropTypes.string,
};

export default Loader;
