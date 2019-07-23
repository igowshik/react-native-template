import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { Avatar, Button, Card, Paragraph } from 'react-native-paper';
import moment from 'moment';

import DateTimePicker from '../../../components/DateTimePicker';

export default class DateTimePickerTester extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDateTimePickerVisible: false,
      selectedDate: null,
    };
  }

  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  handleDatePicked = date => {
    this.setState({ selectedDate: moment(date).format('LLLL') });
    this.hideDateTimePicker();
  };

  render() {
    return (
      <View style={{ flex: 1, margin: 30 }}>
        <StatusBar barStyle="default" />
        <Card elevation={4}>
          <Card.Title
            title="DateTime Picker"
            left={props => <Avatar.Icon {...props} icon="date-range" />}
          />
          <Card.Content>
            <Paragraph>
              {this.state.selectedDate || 'Select date to view here'}
            </Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button
              icon="done"
              mode="contained"
              onPress={this.showDateTimePicker}
              color="#5856d6"
            >
              {'Select date'}
            </Button>
          </Card.Actions>
        </Card>
        <DateTimePicker
          value={new Date()}
          mode="datetime"
          visible={this.state.isDateTimePickerVisible}
          onDateSelect={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
        />
      </View>
    );
  }
}
