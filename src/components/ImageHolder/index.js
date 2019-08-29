import React from 'react';
import { Field } from 'redux-form';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import * as colors from 'cnxapp/src/utils/colorsConstants';
import { IconButton } from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5Pro';

import RFImageHolder from '../ReduxFormComponents/RFImageHolder';
const uuidv1 = require('uuid/v1');

const ImageHolder = ({ fields, viewImageHadler }) =>
  fields.map((image, index) => (
    <View style={styles.container} key={uuidv1()}>
      <Field
        name={image}
        component={RFImageHolder}
        viewImage={viewImageHadler}
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
        onPress={() => fields.remove(index)}
      />
    </View>
  ));

ImageHolder.propTypes = {
  viewImageHadler: PropTypes.func,
};

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

export default ImageHolder;
