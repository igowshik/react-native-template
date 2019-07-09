import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { PRIMARY } from 'cnxapp/src/utils/colorsConstants';
import { TextInput, HelperText } from 'react-native-paper';

export const RFNumberInput = props => {
  const {
    input,
    label,
    required,
    helperText,
    meta: { error, touched },
    ...inputProps
  } = props;
  let hasError = false;

  if (required && touched && error) {
    hasError = true;
  }
  return (
    <View style={styles.item}>
      <TextInput
        {...inputProps}
        onChangeText={input.onChange}
        onBlur={input.onBlur}
        onFocus={input.onFocus}
        value={input.value}
        label={required ? `${label}*` : label}
        keyboardType="phone-pad"
        error={hasError}
        style={{ width: '100%' }}
      />
      {required ? (
        <HelperText type="error" visible={hasError}>
          {helperText || 'this field is required'}
        </HelperText>
      ) : null}
    </View>
  );
};

RFNumberInput.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  helperText: PropTypes.string,
};

const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    margin: 8,
  },
  field: {
    flex: 1,
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
