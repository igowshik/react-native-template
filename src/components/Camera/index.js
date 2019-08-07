import React, { PureComponent } from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native';
import { RNCamera } from 'react-native-camera';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5Pro';
import { IconButton } from 'react-native-paper';
import CameraRoll from '@react-native-community/cameraroll';
import PropTypes from 'prop-types';

import * as colors from 'cnxapp/src/utils/colorsConstants';

import { dirPicutures } from './StorageConfig';
const moment = require('moment');
const RNFS = require('react-native-fs');

let { height, width } = Dimensions.get('window');
let orientation = height > width ? 'Portrait' : 'Landscape';

// move the attachment to app folder
const moveAttachment = async (filePath, newFilepath) =>
  new Promise((resolve, reject) => {
    RNFS.mkdir(dirPicutures)
      .then(() => {
        RNFS.moveFile(filePath, newFilepath)
          .then(() => {
            resolve(true);
          })
          .catch(error => {
            reject(error);
          });
      })
      .catch(err => {
        reject(err);
      });
  });

class NativeCamera extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      orientation,
    };
    this.takePicture = this.takePicture.bind(this);
  }

  componentWillMount() {
    Dimensions.addEventListener('change', this.handleOrientationChange);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.handleOrientationChange);
  }

  handleOrientationChange = dimensions => {
    ({ height, width } = dimensions.window);
    orientation = height > width ? 'Portrait' : 'Landscape';
    this.setState({ orientation });
  };

  // ************************** Captur and Save Image *************************
  saveImage = async filePath => {
    try {
      // set new image name and filepath
      const newImageName = `${moment().format('DDMMYY_HHmmSSS')}.jpg`;
      const newFilepath = `${dirPicutures}/${newImageName}`;
      // move and save image to new filepath
      await moveAttachment(filePath, newFilepath);
      // console.log('image moved', imageMoved); //eslint-disable-line
    } catch (error) {
      console.log(error); //eslint-disable-line
    }
  };

  takePicture = async () => {
    if (this.camera) {
      // const options = { quality: 0.5 };
      const options = { quality: 0.1, base64: true };
      const data = await this.camera.takePictureAsync(options);
      // console.log(data);//eslint-disable-line
      CameraRoll.saveToCameraRoll(data.uri);
      this.saveImage(data.uri);
      this.props.closeCamera(data);
    }
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.container}
          orientation="auto"
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
        >
          <View
            style={
              this.state.orientation === 'Portrait'
                ? styles.buttonContainerPortrait
                : styles.buttonContainerLandscape
            }
          >
            <TouchableOpacity
              onPress={this.takePicture}
              style={
                this.state.orientation === 'Portrait'
                  ? styles.buttonPortrait
                  : styles.buttonLandscape
              }
            >
              <IconButton
                icon={() => (
                  <FontAwesome5
                    name="camera-retro"
                    color={colors.PURPLE}
                    size={25}
                    solid
                  />
                )}
                color={colors.PURPLE}
                mode="outlined"
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={this.props.closeCamera}
              style={
                this.state.orientation === 'Portrait'
                  ? styles.buttonPortrait
                  : styles.buttonLandscape
              }
            >
              <IconButton
                icon={() => (
                  <FontAwesome5
                    name="times-circle"
                    color={colors.SECONDARY}
                    size={25}
                    solid
                  />
                )}
                color={colors.SECONDARY}
                mode="outlined"
              />
            </TouchableOpacity>
          </View>
        </RNCamera>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainerPortrait: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  buttonContainerLandscape: {
    position: 'absolute',
    bottom: 0,
    top: 0,
    right: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  buttonPortrait: {
    backgroundColor: 'transparent',
    padding: 5,
    marginHorizontal: 20,
  },
  buttonLandscape: {
    backgroundColor: 'transparent',
    padding: 5,
    marginVertical: 20,
  },
});

NativeCamera.propTypes = {
  closeCamera: PropTypes.func.isRequired,
};

export default NativeCamera;
