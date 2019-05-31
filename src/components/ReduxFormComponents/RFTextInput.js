import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { PRIMARY } from 'cnxapp/src/utils/colorsConstants';
import { TextInput } from 'react-native-paper';

// Relative imports
import { CNXTextLight } from '../Texts';

export const RFTextInput = props => {
  const {
    input,
    label,
    required,
    meta: { error, touched },
    ...inputProps
  } = props;
  let hasError = false;
  let errorField = null; //eslint-disable-line

  if (required && touched && error) {
    hasError = true;
    if (typeof error === 'string')
      errorField = (
        <CNXTextLight style={styles.errorText}>{` ${error}`}</CNXTextLight>
      );
  }
  return (
    <View style={styles.item}>
      <TextInput
        {...inputProps}
        label={label}
        onChangeText={input.onChange}
        onBlur={input.onBlur}
        onFocus={input.onFocus}
        value={input.value}
        style={{ width: '40%' }}
        error={hasError}
      />
    </View>
  );
};

RFTextInput.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
};

const styles = StyleSheet.create({
  // const styles = {
  item: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    margin: 8,
    marginBottom: 0,
    marginTop: 0,
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
// };
