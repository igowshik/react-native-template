import { Text } from 'native-base';
import PropTypes from 'prop-types';
import React from 'react';
import { Switch, TouchableRipple } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import * as colors from 'cnxapp/src/utils/colorsConstants';

export default class CNXSwitch extends React.Component {
  _onSwitchPress = () => {
    const { isSwitchOn } = this.state;
    this.setState({ isSwitchOn: !isSwitchOn });
  };

  render() {
    const { label, selected, onChange } = this.props;
    return (
      <TouchableRipple onPress={onChange} rippleColor="rgba(0, 0, 0, .0)">
        <View style={styles.row}>
          <Text
            style={[
              styles.textStyle,
              { color: selected ? colors.BLUE : '#000' },
            ]}
          >
            {label}
          </Text>
          <View pointerEvents="none">
            <Switch color={colors.ORANGE} value={selected} />
          </View>
        </View>
      </TouchableRipple>
    );
  }
}

CNXSwitch.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
};

const styles = StyleSheet.create({
  textStyle: {
    paddingRight: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 16,
    padding: 10,
  },
});
