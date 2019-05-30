import { View, StyleSheet } from 'react-native';
import React from 'react';
import { RadioButton, TouchableRipple } from 'react-native-paper';
import { Text } from 'native-base';
import * as colors from 'cnxapp/src/utils/colorsConstants';

class RadioButtonGroup extends React.Component {
  state = {
    checked: 'normal',
  };

  render() {
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: '#fff',
          },
        ]}
      >
        <TouchableRipple onPress={() => this.setState({ checked: 'normal' })}>
          <View style={styles.row}>
            <Text>Normal</Text>
            <View pointerEvents="none">
              <RadioButton
                value="normal"
                color={colors.ORANGE}
                status={
                  this.state.checked === 'normal' ? 'checked' : 'unchecked'
                }
              />
            </View>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => this.setState({ checked: 'custom' })}>
          <View style={styles.row}>
            <Text>Custom</Text>
            <View pointerEvents="none">
              <RadioButton
                value="custom"
                color={colors.ORANGE}
                status={
                  this.state.checked === 'custom' ? 'checked' : 'unchecked'
                }
              />
            </View>
          </View>
        </TouchableRipple>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    padding: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
});

export default RadioButtonGroup;
