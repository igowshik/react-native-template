import React from 'react';
import { Divider } from 'react-native-paper';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { RadioInput } from '../../../../components/InputField';

class ShareType extends React.Component {
  state = {
    value: '',
  };

  conexionShareForm1 = () => (
    <View>
      <Divider style={{ marginLeft: 10, marginRight: 20 }} />
      <View style={{ flexDirection: 'row', margin: 10 }}>
        <Text
          style={{
            marginRight: 30,
            marginTop: 8,
            fontSize: 20,
            fontFamily:
              Platform.OS === 'ios' ? 'Montserrat' : 'Montserrat-Regular',
          }}
        >
          Sharing?
        </Text>
        {/* <RadioButton.Group
          onValueChange={value => this.setState({ value })}
          value={this.state.value}
        > */}
        <RadioInput
          value="public"
          label="public"
          name="public"
          status={this.state.value === 'public' ? 'checked' : 'unchecked'}
          onPress={() => {
            this.setState({ value: 'public' });
          }}
          style={styles.container}
        />
        <RadioInput
          value="private"
          label="private"
          name="private"
          status={this.state.value === 'private' ? 'checked' : 'unchecked'}
          onPress={() => {
            this.setState({ value: 'private' });
          }}
          style={styles.container}
        />
        <RadioInput
          value="shared"
          label="shared"
          name="shared"
          status={this.state.value === 'shared' ? 'checked' : 'unchecked'}
          onPress={() => {
            this.setState({ value: 'shared' });
          }}
          style={styles.container}
        />
        {/* </RadioButton.Group> */}
      </View>
      <Divider style={{ marginLeft: 10, marginRight: 20 }} />
    </View>
  );

  render() {
    return this.conexionShareForm1();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    margin: 10,
  },
});

export { ShareType };
