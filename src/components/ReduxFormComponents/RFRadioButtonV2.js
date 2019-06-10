import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, ViewPropTypes, Platform } from 'react-native';
import { RadioButton } from 'react-native-paper';

export const RFRadioButtonV2 = props => {
  const {
    label,
    required,
    value,
    onValueChange,
    status,
    onPress,
    style,
  } = props;

  return (
    <View style={style || { flex: 1, flexDirection: 'row' }}>
      <Text
        style={{
          marginRight: 10,
          fontSize: 20,
          fontFamily:
            Platform.OS === 'ios' ? 'Montserrat' : 'Montserrat-Regular',
        }}
      >
        {label}
      </Text>
      <RadioButton
        value={value}
        status={status}
        onValueChange={onValueChange}
        onPress={onPress}
        style={style}
        required={required}
      />
    </View>
  );
};

RFRadioButtonV2.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  required: PropTypes.bool,
  status: PropTypes.string,
  onValueChange: PropTypes.func,
  onPress: PropTypes.func,
  style: ViewPropTypes.style,
};
