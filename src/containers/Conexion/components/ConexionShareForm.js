import React from 'react';
import { RadioButton } from 'react-native-paper';
import { View, Text, StyleSheet } from 'react-native';

class ConexionShareForm extends React.Component {
  state = {
    value: 'value',
  };

  conexionShareForm1 = () => (
    <View style={{ flexDirection: 'row', margin: 10 }}>
      <Text style={{ marginRight: 30, marginTop: 8, fontSize: 20 }}>
        Sharing?
      </Text>

      <RadioButton.Group
        onValueChange={value => this.setState({ value })}
        value={this.state.value}
      >
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          <RadioButton value="public" />
          <Text style={styles.radioText}>Public</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          <RadioButton value="private" />
          <Text style={styles.radioText}>Private</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          <RadioButton value="shared" />
          <Text style={styles.radioText}>Shared</Text>
        </View>
      </RadioButton.Group>
    </View>
  );

  render() {
    return this.conexionShareForm1();
  }
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
  },
  placeRight: {
    flex: 1,
    marginBottom: 10,
    flexDirection: 'row',
  },
  placeRightPhone: {
    flex: 1,
    marginBottom: 10,
    flexDirection: 'row',
    // width: '33%',
  },
  // dropdownPhone: { width: '33%' },
  radioText: {
    marginRight: 30,
    marginTop: 8,
    fontSize: 17,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
  },
});

export { ConexionShareForm };
