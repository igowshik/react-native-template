import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Image } from 'react-native';

class RFImageHolder extends React.PureComponent {
  render() {
    const { input, ...inputProps } = this.props;
    return (
      <Image
        {...inputProps}
        resizeMode="cover"
        source={{
          isStatic: true,
          uri: `data:image/jpeg;base64,${input.value}`,
        }}
        style={styles.imageContainer}
      />
    );
  }
}

RFImageHolder.propTypes = {
  input: PropTypes.object,
};
const styles = StyleSheet.create({
  imageContainer: {
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: 10,
  },
});

export default RFImageHolder;
