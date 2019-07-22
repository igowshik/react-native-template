import React from 'react';
import { Field } from 'redux-form';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { RFTextInput } from '../ReduxFormComponents/RFTextInput';
import { RFNumberInput } from '../ReduxFormComponents/RFNumberInput';

export const TextInput = props => {
  const { label, name, required, helperText, multiline, disabled } = props;
  return (
    <Field
      style={styles.field}
      label={label}
      name={name}
      component={RFTextInput}
      required={required}
      helperText={helperText}
      multiline={multiline}
      disabled={disabled}
    />
  );
};

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  helperText: PropTypes.string,
  multiline: PropTypes.bool,
  disabled: PropTypes.bool,
};

export const NumberInput = props => {
  const { label, name, required, helperText } = props;
  return (
    <Field
      style={styles.field}
      label={label}
      name={name}
      component={RFNumberInput}
      required={required}
      helperText={helperText}
    />
  );
};

NumberInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  helperText: PropTypes.string,
};

const styles = StyleSheet.create({
  field: {
    width: '100%',
    marginTop: 5,
  },
});
