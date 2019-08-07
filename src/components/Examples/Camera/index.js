import React from 'react';
// import PropTypes from 'prop-types';
import { View, StatusBar, Image, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withNavigation } from 'react-navigation';
import { Button, IconButton } from 'react-native-paper';
import Lo from 'lodash';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5Pro';

import * as colors from 'cnxapp/src/utils/colorsConstants';

import NativeCamera from '../../Camera';
const uuidv1 = require('uuid/v1');

// import DashboardMainScreen from '../Dashboard';

class CameraExample extends React.Component {
  state = {
    canViewCamera: false,
    imageURI: [],
  };

  closeCamera = uri => {
    if (uri.base64) {
      this.setState(prevState => ({
        canViewCamera: false,
        imageURI: [...prevState.imageURI, uri],
      }));
    } else this.setState({ canViewCamera: false });
  };

  renderImages = () => {
    const { imageURI, canViewCamera } = this.state;
    if (!Lo.isEmpty(imageURI) && !canViewCamera) {
      return imageURI.map(image => (
        <View style={styles.container} key={uuidv1()}>
          <Image
            resizeMode="cover"
            source={{
              isStatic: true,
              uri: `data:image/jpeg;base64,${image.base64}`,
            }}
            style={{ width: 100, height: 100, margin: 5, borderRadius: 10 }}
          />
          <IconButton
            icon={() => (
              <FontAwesome5
                name="minus-circle"
                color={colors.RED}
                size={20}
                solid
              />
            )}
            color={colors.RED}
            style={styles.close}
          />
          <IconButton
            icon={() => (
              <FontAwesome5 name="eye" color={colors.PRIMARY} size={20} solid />
            )}
            color={colors.PRIMARY}
            style={styles.view}
          />
        </View>
      ));
    }
    return null;
  };

  render() {
    const { canViewCamera } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="default" />
        {!canViewCamera ? (
          <Button
            icon="camera"
            mode="contained"
            onPress={() => this.setState({ canViewCamera: true })}
          >
            Open Camera
          </Button>
        ) : null}
        {/* <DashboardMainScreen /> */}
        <View style={{ flexDirection: 'row' }}>{this.renderImages()}</View>
        {canViewCamera ? <NativeCamera closeCamera={this.closeCamera} /> : null}
      </View>
    );
  }
}

CameraExample.propTypes = {};

/**
 * @method: mapStateToProps()
 * @description: Redux Map method to map all redux state into each individual state value
 * @returns: jobState ans filterState in the State
 */
const mapStateToProps = state => ({
  rootState: state.rootState,
});

/**
 * @method: mapDispatchToProps()
 * @description: Map the Props of this class to the respective Redux dispatch functions
 * @returns: Mapped functions
 */
const mapDispatchToProps = dispatch => ({ //eslint-disable-line
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const styles = StyleSheet.create({
  container: {
    margin: 5,
  },
  cover: {
    flex: 1,
    borderRadius: 5,
  },
  close: {
    margin: 8,
    position: 'absolute',
    top: 0,
    left: 0,
    width: 25,
    height: 25,
  },
  view: {
    margin: 8,
    position: 'absolute',
    top: 0,
    right: 0,
    width: 25,
    height: 25,
  },
});

export default compose(
  withNavigation,
  withConnect,
)(CameraExample);
