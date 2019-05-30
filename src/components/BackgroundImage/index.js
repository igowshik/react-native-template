import { StyleSheet, ImageBackground } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';

const BackgroundImage = props => {
  const { children, imageSource } = props;
  return (
    <ImageBackground style={styles.picture} source={imageSource}>
      {children}
    </ImageBackground>
  );
};

BackgroundImage.propTypes = {
  children: PropTypes.any,
  imageSource: PropTypes.any,
};

const styles = StyleSheet.create({
  picture: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
});

export default BackgroundImage;
