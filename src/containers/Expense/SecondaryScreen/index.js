import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class SecondaryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={{ flex: 1, margin: 30 }}>
        <Text>SecondaryScreen</Text>
      </View>
    );
  }
}
