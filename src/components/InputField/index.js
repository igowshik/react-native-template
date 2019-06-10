import React from 'react';
import { Field } from 'redux-form';
import { StyleSheet, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

import { RFTextInput } from '../ReduxFormComponents/RFTextInput';
import { RFNumberInput } from '../ReduxFormComponents/RFNumberInput';
import { RFRadioButtonV2 } from '../ReduxFormComponents/RFRadioButtonV2';

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
  const {
    label,
    name,
    required,
    status,
    onPress,
    onValueChange,
    value,
    style,
  } = props;
  return (
    <Field
      label={label}
      component={RFRadioButtonV2}
      name={name}
      status={status}
      onPress={onPress}
      value={value}
      onValueChange={onValueChange}
      required={required}
      style={style}
    />
  );
};
RadioInput.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  required: PropTypes.bool,
  status: PropTypes.string,
  onPress: PropTypes.func,
  value: PropTypes.string,
  onValueChange: PropTypes.func,
  style: ViewPropTypes.style,
};
const styles = StyleSheet.create({
  field: {
    width: '100%',
    marginTop: 5,
  },
});
