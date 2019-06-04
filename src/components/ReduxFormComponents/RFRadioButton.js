import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';
import { RadioButton } from 'react-native-paper';

export const RFRadioButton = props => {
  const {
    input,
    label,
    required,
    // meta: { error, touched },
    status,
    onChange,
    value,
    ...inputProps
  } = props;

  return (
    <RadioButton
      {...inputProps}
      status={status}
      value={value}
      onPress={onChange}
    />
  );
};

RFRadioButton.propTypes = {
  input: PropTypes.object.isRequired,
  // meta: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  status: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
};
