import React, { PureComponent } from 'react';
import { StyleSheet, View, Modal } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import PropTypes from 'prop-types';
import { BlurView } from '@react-native-community/blur';

import * as colors from 'cnxapp/src/utils/colorsConstants';

class Loader extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { viewRef: null };
  }

  render() {
    const { loading } = this.props;

    return (
      <Modal
        transparent
        animationType="none"
        onRequestClose={() => {}}
        visible={loading || false}
      >
        <View style={styles.modalBackground}>
          <BlurView
            style={styles.absolute}
            viewRef={this.state.viewRef}
            blurType="light"
            blurAmount={5}
          />
          <View style={styles.activityIndicatorWrapper}>
            <ActivityIndicator
              size={30}
              color={colors.PURPLE}
              animating={loading}
            />
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 70,
    width: 70,
    borderRadius: 7,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

Loader.propTypes = { loading: PropTypes.bool };

export default Loader;
