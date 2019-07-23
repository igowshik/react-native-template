import React from 'react';
// import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5Pro';
import { Card, TouchableRipple, IconButton, Text } from 'react-native-paper';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { formValueSelector } from 'redux-form';

// Absolute Imports
import * as colors from 'cnxapp/src/utils/colorsConstants';
import DateTimePicker from 'cnxapp/src/components/DatePickerReduxForm';
import Dropdown from 'cnxapp/src/components/Dropdown';
import { getDateByFormat } from 'cnxapp/src/utils/DateFormatter';
import { TextInput } from 'cnxapp/src/components/InputField';
import { createStructuredSelector } from 'reselect';
import { selectExpenseMetadata } from '../../selectors';
import { BUSINESS_UNIT } from '../../constants';

class CreateExpenseForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDatePickerVisible: false,
    };
    this.showDatePicker = this.showDatePicker.bind(this);
    this.hideDateTimePicker = this.hideDateTimePicker.bind(this);
  }

  showDatePicker = () => this.setState({ isDatePickerVisible: true });

  hideDateTimePicker = () => this.setState({ isDatePickerVisible: false });

  renderBusinessUnit = () => {
    const { expenseMetadata } = this.props;
    const businessUnit = [];
    expenseMetadata.map(unit =>
      businessUnit.push({
        key: unit.Value,
        value: unit.Value,
        label: unit.Text,
      }),
    );
    return businessUnit;
  };

  render() {
    const { isDatePickerVisible } = this.state;

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
                  <Text style={{ color: colors.BLUE }}>
                    {getDateByFormat(this.props.exp_report_date, 'L')}
                  </Text>
                  {/* <TextInput
                    style={styles.dateText}
                    name="exp_report_date"
                    label=""
                    disabled
                    defaultValue={getDateByFormat(selectedDate, 'L')}
                  /> */}
                </View>
              </TouchableRipple>

              <TextInput
                label="Report Name"
                name="exp_report_name"
                required
                helperText="Report Name is required"
              />

              <Dropdown
                label="Business Unit"
                name="exp_business_unit"
                required
                data={this.renderBusinessUnit()}
              />

              <TextInput
                label="Business Purpose"
                name="exp_business_purpose"
                multiline
              />
            </View>
          </Card.Content>
        </Card>
        <DateTimePicker
          mode="date"
          visible={isDatePickerVisible}
          onCancel={this.hideDateTimePicker}
          name="exp_report_date"
        />
      </View>
    );
  }
}
CreateExpenseForm.propTypes = {
  expenseMetadata: PropTypes.array.isRequired,
  exp_report_date: PropTypes.object,
};

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

const selectorCreateExpense = formValueSelector('createExpense');

const mapStateToProps = createStructuredSelector({
  expenseMetadata: selectExpenseMetadata(BUSINESS_UNIT),
});

const withConnect = connect(
  mapStateToProps,
  {},
);

export default compose(
  connect(state =>
    selectorCreateExpense(
      state,
      'exp_report_name',
      'exp_report_date',
      'exp_business_purpose',
    ),
  ),
  withConnect,
)(CreateExpenseForm);
