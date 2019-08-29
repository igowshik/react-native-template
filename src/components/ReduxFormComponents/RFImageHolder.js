import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Image, View } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
const loaderImage = require('cnxapp/src/assets/images/imgloader.png');
const pdfImage = require('cnxapp/src/assets/images/pdfIcon.png');
class RFImageHolder extends React.PureComponent {
  isUrl(s) {
    const regexp = /(ftp|http|https):/;
    return regexp.test(s);
  }

  render() {
    const { input, viewImage, ...inputProps } = this.props;
    if (input.value.includes('.pdf')) {
      return (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            width: 90,
            height: 90,
          }}
        >
          <Image
            resizeMethod="auto"
            style={styles.imageContainerPdf}
            defaultSource={pdfImage}
          />
        </View>
      );
    }
    return (
      <TouchableRipple onPress={() => viewImage(input.value)}>
        <Image
          {...inputProps}
          resizeMode="cover"
          source={{
            isStatic: !this.isUrl(input.value),
            uri: this.isUrl(input.value)
              ? input.value
              : `data:image/jpeg;base64,${input.value}`,
          }}
          style={styles.imageContainer}
          defaultSource={loaderImage}
        />
      </TouchableRipple>
    );
  }
}

RFImageHolder.propTypes = {
  input: PropTypes.object,
  viewImage: PropTypes.func,
};
const styles = StyleSheet.create({
  imageContainerPdf: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  imageContainer: {
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: 10,
  },
});

export default RFImageHolder;
