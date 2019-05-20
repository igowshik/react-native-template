import React from 'react';
import PropTypes from 'prop-types';
import { TextInput, StyleSheet } from 'react-native';
import { Item, Label } from 'native-base';
import { PRIMARY } from 'cnxapp/src/utils/colorsConstants';

// Relative imports
import { CNXTextLight, CNXTextM } from '../CNXTexts';

export const RFNumberInput = props => {
  const {
    input,
    label,
    required,
    meta: { error, touched },
    ...inputProps
  } = props;
  let hasError = false;
  let errorField = null;

  if (required && touched && error) {
    hasError = true;
    if (typeof error === 'string')
      errorField = (
        <CNXTextLight style={styles.errorText}>{` ${error}`}</CNXTextLight>
      );
  }
  return (
    <Item error={hasError} style={styles.item}>
      <Label>
        <CNXTextM style={hasError ? styles.lableError : styles.lable}>
          {label}
        </CNXTextM>
        {errorField}
      </Label>
      <TextInput
        {...inputProps}
        onChangeText={input.onChange}
        onBlur={input.onBlur}
        onFocus={input.onFocus}
        value={input.value}
        keyboardType="numeric"
      />
    </Item>
  );
};

RFNumberInput.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
};

const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: 8,
  },
  field: {
    width: '100%',
    marginTop: 5,
    fontSize: 14,
  },
  lable: {
    fontSize: 16,
    marginRight: 4,
    color: PRIMARY,
  },
  lableError: {
    fontSize: 16,
    marginRight: 4,
    color: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 13,
  },
});
