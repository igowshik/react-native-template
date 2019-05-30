import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Text } from 'native-base';
import ReactNativePickerModule from 'react-native-picker-module';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5Pro';

// // Absolute imports
import * as Colors from 'cnxapp/src/utils/colorsConstants';

class Selector extends React.Component {
  onSelectDD = () => {
    this.pickerRef.show();
  };

  render() {
    const {
      value,
      title,
      items,
      onValueChange,
      placeholder,
      width,
      height,
      textColor,
      border,
      bottomBorder,
      borderColor,
    } = this.props;

    const dropDownStyle = {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderColor: borderColor || Colors.GREY,
      borderBottomColor: Colors.GREY,
      borderWidth: 0.5,
      borderRadius: 2,
      margin: 10,
      minWidth: width || 150,
      height: height || 44,
    };

    if (!border) dropDownStyle.borderColor = 'transparent';
    if (!bottomBorder) dropDownStyle.borderBottomColor = 'transparent';

    return (
      <View>
        <ReactNativePickerModule
          pickerRef={e => {
            this.pickerRef = e;
          }}
          value={value}
          title={title}
          items={items}
          onValueChange={onValueChange}
        />
        <TouchableOpacity onPress={this.onSelectDD}>
          <View style={dropDownStyle}>
            <Text
              numberOfLines={1}
              style={{ margin: 5, color: textColor || '#000' }}
            >
              {placeholder}
            </Text>
            <FontAwesome5
              style={{ margin: 5, color: Colors.PRIMARY }}
              name="chevron-circle-down"
              size={23}
              light
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

Selector.propTypes = {
  title: PropTypes.string,
  onValueChange: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  textColor: PropTypes.string,
  border: PropTypes.bool,
  bottomBorder: PropTypes.bool,
  borderColor: PropTypes.string,
};

export default Selector;
