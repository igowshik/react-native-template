import React from 'react';
import { Field } from 'redux-form';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { RFTextInput } from '../ReduxFormComponents/RFTextInput';
import { RFNumberInput } from '../ReduxFormComponents/RFNumberInput';

export const CNXTextInput = props => {
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

CNXTextInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
};

export const CNXNumberInput = props => {
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

CNXNumberInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
};

const styles = StyleSheet.create({
  field: {
    width: '100%',
    marginTop: 5,
    fontSize: 13,
  },
});
