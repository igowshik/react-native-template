import React, { Component } from 'react';
import { View } from 'react-native';
import ExpenseDashboard from './components/ExpenseDashboard';

export default class DateTimePickerTester extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={{ flex: 1, margin: 30 }}>
        <ExpenseDashboard />
      </View>
    );
  }
}
