import React from 'react';
// import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5Pro';
import { Card, TouchableRipple, IconButton, Text } from 'react-native-paper';
import { Row, Col } from 'react-native-easy-grid';

// Absolute Imports
import * as colors from 'cnxapp/src/utils/colorsConstants';
import DateTimePicker from 'cnxapp/src/components/DateTimePicker';
import Dropdown from 'cnxapp/src/components/Dropdown';
import { getDateByFormat } from 'cnxapp/src/utils/DateFormatter';
import { TextInput } from 'cnxapp/src/components/InputField';

class CreateExpenseForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: new Date(),
      isDatePickerVisible: false,
      businessUnit: ['test'],
      costCenter: 'Test',
    };
    this.showDatePicker = this.showDatePicker.bind(this);
    this.hideDateTimePicker = this.hideDateTimePicker.bind(this);
    this.handleDatePicked = this.handleDatePicked.bind(this);
  }

  showDatePicker = () => this.setState({ isDatePickerVisible: true });

  hideDateTimePicker = () => this.setState({ isDatePickerVisible: false });

  handleDatePicked = dateValue => {
    this.setState({ selectedDate: dateValue });
    this.hideDateTimePicker();
  };

  render() {
    const {
      isDatePickerVisible,
      selectedDate,
      businessUnit,
      costCenter,
    } = this.state;
    return (
      <View style={styles.parentView}>
        <Card elevation={3} style={styles.card}>
          <Card.Content>
            <View>
              <TouchableRipple onPress={this.showDatePicker}>
                <View style={styles.dateView}>
                  <IconButton
                    icon={() => (
                      <FontAwesome5
                        name="calendar-plus"
                        color={colors.SECONDARY}
                        size={20}
                        light
                      />
                    )}
                    color={colors.SECONDARY}
                    mode="outlined"
                    onPress={this.showDatePicker}
                  />
                  <Text>Report Date: </Text>
                  <Text style={styles.dateText}>{` ${getDateByFormat(
                    selectedDate,
                    'L',
                  )}`}</Text>
                </View>
              </TouchableRipple>
              <DateTimePicker
                value={selectedDate}
                mode="date"
                visible={isDatePickerVisible}
                onDateSelect={this.handleDatePicked}
                onCancel={this.hideDateTimePicker}
              />
              <TextInput
                label="Report Name"
                name="exp_report_name"
                required
                helperText="Report Name is required"
              />
              <Row>
                <Col>
                  <Dropdown
                    label="Business Unit"
                    name="exp_business_unit"
                    data={businessUnit}
                  />
                </Col>
                <Col>
                  <TextInput
                    label="Cost Center"
                    name="exp_cost_center"
                    value={costCenter}
                    disabled
                  />
                </Col>
              </Row>
              <TextInput
                label="Business Purpose"
                name="exp_business_purpose"
                multiline
              />
            </View>
          </Card.Content>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  dateView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  dateText: {
    color: colors.PRIMARY,
    margin: 3,
  },
  card: {
    borderTopColor: colors.GREEN,
    borderTopWidth: 2,
  },
  parentView: {
    margin: 10,
  },
});

export default CreateExpenseForm;
