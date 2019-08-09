import React from 'react';
// import PropTypes from 'prop-types';
import { View, StyleSheet, Image } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5Pro';
import {
  Card,
  TouchableRipple,
  IconButton,
  Text,
  Title,
  Caption,
  Divider,
} from 'react-native-paper';
import { Grid, Row, Col } from 'react-native-easy-grid';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { formValueSelector, change, FieldArray, arrayPush } from 'redux-form';
import { createStructuredSelector } from 'reselect';
import Modal from 'react-native-modal';
import Lo from 'lodash';

// Absolute Imports
import * as colors from 'cnxapp/src/utils/colorsConstants';
import DateTimePicker from 'cnxapp/src/components/DatePickerReduxForm';
import Dropdown from 'cnxapp/src/components/Dropdown';
import { getDateByFormat } from 'cnxapp/src/utils/DateFormatter';
import { TextInput, NumberInput } from 'cnxapp/src/components/InputField';
import { CARD_BORDER_RADIUS } from 'cnxapp/src/utils/valueconstants';
import ImageHolder from 'cnxapp/src/components/ImageHolder';
import NativeCamera from 'cnxapp/src/components/Camera';

import { EXPENSE_TYPE, PAYMENT_TYPE } from '../../../constants';
import { selectExpenseMetadata } from '../../../PrimaryScreen/selectors';
import { CREATE_REPORT_ITEM_FORM } from '../../constants';

class NewReportItemForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDatePickerVisible: false,
      isMileageRowVisible: false,
      isAmountDisabled: false,
      isPaymentTypeDisabled: false,
      canViewCamera: false,
      visible: false,
      viewImageBase64: null,
    };
    this.showDatePicker = this.showDatePicker.bind(this);
    this.hideDateTimePicker = this.hideDateTimePicker.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { riMiles, riStandardMileageRate, changeRDXField } = this.props;
    if (riMiles !== prevProps.riMiles) {
      if (typeof riMiles === 'undefined')
        changeRDXField(CREATE_REPORT_ITEM_FORM, 'riAmount', '0.00');
      else {
        const amount = parseFloat(riMiles) * parseFloat(riStandardMileageRate);
        changeRDXField(CREATE_REPORT_ITEM_FORM, 'riAmount', amount.toString());
      }
    }
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
    const { riExpenseType, changeRDXField, riMiles } = this.props;
    if (riExpenseType === 'TPER' || riExpenseType === 'TPAO') {
      this.setState({
        isMileageRowVisible: true,
        isAmountDisabled: true,
        isPaymentTypeDisabled: true,
      });
      changeRDXField(
        CREATE_REPORT_ITEM_FORM,
        'riStandardMileageRate',
        riExpenseType === 'TPER' ? '0.535' : '0.19',
      );
      changeRDXField(CREATE_REPORT_ITEM_FORM, 'ri_payment_Type', 'CASH');
      if (riMiles) {
        const amount =
          parseFloat(riMiles) *
          parseFloat(riExpenseType === 'TPER' ? '0.535' : '0.19');
        changeRDXField(CREATE_REPORT_ITEM_FORM, 'riAmount', amount.toString());
      }
      return;
    }
    this.setState({
      isMileageRowVisible: false,
      isAmountDisabled: false,
      isPaymentTypeDisabled: false,
    });
    changeRDXField(CREATE_REPORT_ITEM_FORM, 'riStandardMileageRate', '0.0');
    changeRDXField(CREATE_REPORT_ITEM_FORM, 'ri_payment_Type', '');
    changeRDXField(CREATE_REPORT_ITEM_FORM, 'riMiles', '');
    changeRDXField(CREATE_REPORT_ITEM_FORM, 'riAmount', '0');
  };

  closeCamera = uri => {
    if (uri.base64) {
      this.props.pushRDXArray(
        CREATE_REPORT_ITEM_FORM,
        'ri_exp_receipt',
        uri.base64,
      );
      this.setState({ canViewCamera: false });
    } else this.setState({ canViewCamera: false });
  };

  openCamera = () => this.setState({ canViewCamera: true });

  _showDialog = () => this.setState({ visible: true });

  _hideDialog = () => this.setState({ visible: false });

  handleViewImageClick = index => {
    this.setState({
      viewImageBase64: this.props.ri_exp_receipt[index],
      visible: true,
    });
  };

  defaultExpenseType = () => {
    const { paymentTypeMetadata } = this.props;
    const defaultItem = Lo.find(paymentTypeMetadata, 'Selected');
    return defaultItem ? defaultItem.Value : null;
  };

  renderForm = () => {
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
                  <TouchableRipple
                    onPress={this.showDatePicker}
                    style={{ marginTop: 25 }}
                  >
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
                    value={this.defaultExpenseType()}
                    data={this.renderExpenseType()}
                    onChangeTrigger={() => this.onExpenseTypeChanged()}
                  />
                </Col>
              </Row>
              {isMileageRowVisible ? (
                <Row>
                  <Col>
                    <NumberInput
                      label="Miles"
                      name="riMiles"
                      // onChangeTrigger={this.onMilesChanged}
                    />
                  </Col>
                  <Col>
                    <NumberInput
                      label="Standard Mileage Rate"
                      name="riStandardMileageRate"
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
                  <NumberInput
                    label="Amount"
                    name="riAmount"
                    disabled={isAmountDisabled}
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
                <View style={styles.reciept}>
                  <View style={{ flexDirection: 'column', marginEnd: 10 }}>
                    <Title>Receipt</Title>
                    <Caption>(Attach image and files)</Caption>
                  </View>
                  <IconButton
                    icon={() => (
                      <FontAwesome5
                        name="camera-retro"
                        color={colors.PURPLE}
                        size={20}
                        light
                      />
                    )}
                    size={40}
                    color={colors.PURPLE}
                    onPress={this.openCamera}
                  />
                  <IconButton
                    icon={() => (
                      <FontAwesome5
                        name="paperclip"
                        color={colors.PURPLE}
                        size={20}
                        light
                      />
                    )}
                    color={colors.PURPLE}
                    // onPress={this.showDatePicker}
                  />
                </View>
              </Row>
              <Row>
                <Divider />
                <FieldArray
                  name="ri_exp_receipt"
                  component={ImageHolder}
                  viewImageHadler={this.handleViewImageClick}
                />
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
  };

  render() {
    const { canViewCamera, viewImageBase64 } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <Modal
          isVisible={this.state.visible}
          onBackdropPress={this._hideDialog}
        >
          <View style={styles.content}>
            <Image
              resizeMode="stretch"
              style={{
                width: '100%',
                height: '100%',
                borderRadius: CARD_BORDER_RADIUS,
              }}
              source={{
                isStatic: true,
                uri: `data:image/jpeg;base64,${viewImageBase64}`,
              }}
            />
            <IconButton
              icon={() => (
                <FontAwesome5
                  name="times-circle"
                  size={30}
                  light
                  color={colors.RED}
                />
              )}
              size={30}
              style={styles.close}
              onPress={this._hideDialog}
              color={colors.RED}
            />
          </View>
        </Modal>
        {!canViewCamera ? (
          this.renderForm()
        ) : (
          <NativeCamera closeCamera={this.closeCamera} />
        )}
      </View>
    );
  }
}
NewReportItemForm.propTypes = {
  expenseTypeMetadata: PropTypes.array.isRequired,
  paymentTypeMetadata: PropTypes.array.isRequired,
  ri_transaction_date: PropTypes.object,
  riExpenseType: PropTypes.string,
  riMiles: PropTypes.string,
  changeRDXField: PropTypes.func,
  riStandardMileageRate: PropTypes.string,
  pushRDXArray: PropTypes.func,
  ri_exp_receipt: PropTypes.array,
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
    borderRadius: CARD_BORDER_RADIUS,
  },
  parentView: {
    margin: 10,
  },
  reciept: {
    margin: 8,
    alignItems: 'center',
    flexDirection: 'row',
  },
  content: {
    backgroundColor: 'white',
    borderRadius: CARD_BORDER_RADIUS,
  },
  close: {
    margin: 8,
    position: 'absolute',
    top: 0,
    right: 0,
    width: 50,
    height: 50,
  },
});

const selectorCreateExpense = formValueSelector(CREATE_REPORT_ITEM_FORM);

const mapStateToProps = createStructuredSelector({
  expenseTypeMetadata: selectExpenseMetadata(EXPENSE_TYPE),
  paymentTypeMetadata: selectExpenseMetadata(PAYMENT_TYPE),
});

const mapDispatchToProps = dispatch => ({
  changeRDXField: (form, field, value) => dispatch(change(form, field, value)),
  pushRDXArray: (form, field, value) => dispatch(arrayPush(form, field, value)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  connect(state =>
    selectorCreateExpense(
      state,
      'riStandardMileageRate',
      'ri_transaction_date',
      'riExpenseType',
      'riAmount',
      'riMiles',
      'ri_exp_receipt',
    ),
  ),
  withConnect,
)(NewReportItemForm);
