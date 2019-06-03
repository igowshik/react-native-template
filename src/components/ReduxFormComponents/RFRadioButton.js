import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';
import { PRIMARY } from 'cnxapp/src/utils/colorsConstants';
import { RadioButton } from 'react-native-paper';

export const RFRadioButton = props => {
  const {
    input,
    label,
    required,
    // meta: { error, touched },
    ...inputProps
  } = props;

  return <RadioButton {...inputProps} />;
};

RFRadioButton.propTypes = {
  input: PropTypes.object.isRequired,
  // meta: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
};
