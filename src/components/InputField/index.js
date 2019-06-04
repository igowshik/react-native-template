import React from 'react';
import { Field } from 'redux-form';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { RFTextInput } from '../ReduxFormComponents/RFTextInput';
import { RFNumberInput } from '../ReduxFormComponents/RFNumberInput';
import { RFRadioButton } from '../ReduxFormComponents/RFRadioButton';

export const TextInput = props => {
  const { label, name, required } = props;
  return (
    <Field
      style={styles.field}
      label={label}
      name={name}
      component={RFTextInput}
      required={required}
    />
  );
};

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
};

export const NumberInput = props => {
  const { label, name, required } = props;
  return (
    <Field
      style={styles.field}
      label={label}
      name={name}
      component={RFNumberInput}
      required={required}
    />
  );
};

NumberInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
};

export const RadioInput = props => {
  const { label, name, required, status, onChange, value } = props;
  return (
    <Field
      label={label}
      component={RFRadioButton}
      name={name}
      status={status}
      onChange={onChange}
      value={value}
      required={required}
    />
  );
};
RadioInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  status: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
};
const styles = StyleSheet.create({
  field: {
    width: '100%',
    marginTop: 5,
  },
});
