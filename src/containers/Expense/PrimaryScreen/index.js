import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { Avatar, Card } from 'react-native-paper';

export default class Expense extends Component {
  state = {};

  render() {
    return (
      <View style={{ flex: 1, margin: 30 }}>
        <StatusBar hidden />
        <Card elevation={4}>
          <Card.Title
            title="Expense work In progress"
            left={props => <Avatar.Icon {...props} icon="attach-money" />}
          />
        </Card>
      </View>
    );
  }
}
