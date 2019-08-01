import React from 'react';
// import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5Pro';
import { Card, TouchableRipple, IconButton, Text } from 'react-native-paper';
import { Grid, Row, Col } from 'react-native-easy-grid';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { formValueSelector, change } from 'redux-form';

// Absolute Imports
import * as colors from 'cnxapp/src/utils/colorsConstants';
import DateTimePicker from 'cnxapp/src/components/DatePickerReduxForm';
import Dropdown from 'cnxapp/src/components/Dropdown';
import { getDateByFormat } from 'cnxapp/src/utils/DateFormatter';
import { TextInput } from 'cnxapp/src/components/InputField';
import { createStructuredSelector } from 'reselect';
import { EXPENSE_TYPE, PAYMENT_TYPE } from '../../../constants';
import { selectExpenseMetadata } from '../../../PrimaryScreen/selectors';
import { CREATE_REPORT_ITEM } from '../../constants';

class NewReportItemForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDatePickerVisible: false,
      isMileageRowVisible: true,
      isAmountDisabled: false,
      isPaymentTypeDisabled: false,
    };
    this.showDatePicker = this.showDatePicker.bind(this);
    this.hideDateTimePicker = this.hideDateTimePicker.bind(this);
  }

  showDatePicker = () => this.setState({ isDatePickerVisible: true });

  hideDateTimePicker = () => this.setState({ isDatePickerVisible: false });

  renderExpenseType = () => {
    const { expenseTypeMetadata } = this.props;
    const expenseType = [];
    expenseTypeMetadata.map(unit =>
      expenseType.push({
        key: unit.Value,
        value: unit.Value,
        label: unit.Text,
      }),
    );
    return expenseType;
  };

  renderPaymentType = () => {
    const { paymentTypeMetadata } = this.props;
    const paymentType = [];
    paymentTypeMetadata.map(unit =>
      paymentType.push({
        key: unit.Value,
        value: unit.Value,
        label: unit.Text,
      }),
    );
    return paymentType;
  };

  onExpenseTypeChanged = () => {
    const { riExpenseType } = this.props;
    if (riExpenseType === 'TPER' || riExpenseType === 'TPAO') {
      console.log('value matched');
    }
  };

  render() {
    const {
      isDatePickerVisible,
      isMileageRowVisible,
      isAmountDisabled,
      isPaymentTypeDisabled,
    } = this.state;

    return (
      <View style={styles.parentView}>
        <Card elevation={3} style={styles.card}>
          <Card.Content>
            <Grid>
              <Row>
                <Col>
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
                      <Text>Transaction Date: </Text>
                      <Text style={{ color: colors.BLUE }}>
                        {getDateByFormat(this.props.ri_transaction_date, 'L')}
                      </Text>
                    </View>
                  </TouchableRipple>
                </Col>
                <Col>
                  <Dropdown
                    label="Expense Type"
                    name="riExpenseType"
                    required
                    data={this.renderExpenseType()}
                    onChangeTrigger={() => this.onExpenseTypeChanged()}
                  />
                </Col>
              </Row>
              {isMileageRowVisible ? (
                <Row>
                  <Col>
                    <TextInput label="Miles" name="ri_miles" />
                  </Col>
                  <Col>
                    <TextInput
                      label="Standard Mileage Rate"
                      name="ri_standard_mileage_rate"
                      disabled
                    />
                  </Col>
                </Row>
              ) : null}
              <Row>
                <Col>
                  <Dropdown
                    label="Payment Type"
                    name="ri_payment_Type"
                    data={this.renderPaymentType()}
                    disabled={isPaymentTypeDisabled}
                  />
                </Col>
                <Col>
                  <TextInput
                    label="Amount"
                    name="ri_amount"
                    disabled={isAmountDisabled}
                    numeric
                  />
                </Col>
              </Row>
              <Row>
                <TextInput
                  label="Business Purpose"
                  name="ri_business_purpose"
                  required
                  multiline
                />
              </Row>
              <Row>
                <TextInput label="Comment" name="ri_comment" multiline />
              </Row>
              <Row>
                <TextInput label="Receipt" name="exp_receipt" />
              </Row>
            </Grid>
          </Card.Content>
        </Card>
        <DateTimePicker
          mode="date"
          visible={isDatePickerVisible}
          onCancel={this.hideDateTimePicker}
          name="ri_transaction_date"
        />
      </View>
    );
  }
}
NewReportItemForm.propTypes = {
  expenseTypeMetadata: PropTypes.array.isRequired,
  paymentTypeMetadata: PropTypes.array.isRequired,
  ri_transaction_date: PropTypes.object,
  riExpenseType: PropTypes.string,
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

const selectorCreateExpense = formValueSelector(CREATE_REPORT_ITEM);

const mapStateToProps = createStructuredSelector({
  expenseTypeMetadata: selectExpenseMetadata(EXPENSE_TYPE),
  paymentTypeMetadata: selectExpenseMetadata(PAYMENT_TYPE),
});

const mapDispatchToProps = dispatch => ({
  changeRDXField: (form, field, value) => dispatch(change(form, field, value)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  connect(state =>
    selectorCreateExpense(
      state,
      'ri_standard_mileage_rate',
      'ri_transaction_date',
      'riExpenseType',
    ),
  ),
  withConnect,
)(NewReportItemForm);
