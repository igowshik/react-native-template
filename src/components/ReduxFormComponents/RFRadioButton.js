import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, ViewPropTypes } from 'react-native';
import { RadioButton } from 'react-native-paper';

export const RFRadioButton = props => {
  const {
    // input,
    label,
    required,
    // meta: { error, touched },
    // status,
    // onChange,
    onValueChange,
    value,
    style,
    ...inputProps
  } = props;

  return (
    <RadioButton.Group
      onValueChange={onValueChange}
      value={value}
      {...inputProps}
    >
      <View
        style={{
          flexDirection: 'row',
        }}
      >
        <RadioButton value={label} />
        <Text style={style}>Public</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
        }}
      >
        <RadioButton value={value} />
        <Text style={style}>Private</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
        }}
      >
        <RadioButton value={value} />
        <Text style={style}>Shared</Text>
      </View>
    </RadioButton.Group>
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
  onValueChange: PropTypes.func,
  style: ViewPropTypes.style,
};
