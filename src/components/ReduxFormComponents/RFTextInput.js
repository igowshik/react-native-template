import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { PRIMARY } from 'cnxapp/src/utils/colorsConstants';
import { TextInput, HelperText } from 'react-native-paper';

export const RFTextInput = props => {
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
        label={required ? `${label}*` : label}
        onChangeText={input.onChange}
        onBlur={input.onBlur}
        onFocus={input.onFocus}
        value={input.value}
        style={{ width: '100%' }}
        error={hasError}
      />
      {required ? (
        <HelperText type="error" visible={hasError}>
          {helperText || 'this field is required'}
        </HelperText>
      ) : null}
    </View>
  );
};

RFTextInput.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  helperText: PropTypes.string,
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
// };
