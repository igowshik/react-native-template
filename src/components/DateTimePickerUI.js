import React, { Component } from 'react';
import { Text, View } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Button, Icon, Picker } from 'native-base';

export default class DateTimePickerUI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: '',
      isDateTimePickerVisible: false,
    };
  }

  onValueChange(value) {
    this.setState({
      selected: value,
    });
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = () => {
    this._hideDateTimePicker();
  };

  render() {
    const { selected, isDateTimePickerVisible } = this.state;
    return (
      <View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
          <Button
            style={{ margin: 5 }}
            small
            dark
            bordered
            onPress={this._showDateTimePicker}
          >
            <Text>From date: 01/01/2019</Text>
          </Button>
          <Button
            small
            dark
            bordered
            onPress={this._showDateTimePicker}
            style={{ margin: 5 }}
          >
            <Text>To date: 31/01/2019</Text>
          </Button>
          <Button iconRight primary small dark bordered style={{ margin: 5 }}>
            <Picker
              selectedValue={selected}
              onValueChange={this.onValueChange.bind(this)} //eslint-disable-line
              mode="dropdown"
              placeholder="Select expense status"
              textStyle={{ color: '#0045C6' }}
            >
              <Picker.Item label="All Status" value="ALLS" />
              <Picker.Item label="New" value="NEW" />
              <Picker.Item label="Submitted" value="SUBM" />
              <Picker.Item label="Auto Approved" value="AAPR" />
              <Picker.Item label="Manager Approved" value="MAPR" />
              <Picker.Item label="Manager Rejected" value="MREJ" />
              <Picker.Item label="Ready for Payment" value="PAYM" />
              <Picker.Item label="Administrator Rejected" value="AREJ" />
            </Picker>
            <Icon name="arrow-down" />
          </Button>
        </View>
        <DateTimePicker
          isVisible={isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
        />
      </View>
    );
  }
}
