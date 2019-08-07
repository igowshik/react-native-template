import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { IconButton } from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5Pro';
import { reduxForm, reset } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import FullPageModal from 'cnxapp/src/components/FullPageModal';
import { getDateByFormat } from 'cnxapp/src/utils/DateFormatter';
// import * as colors from 'cnxapp/src/utils/colorsConstants';

import { CREATE_REPORT_ITEM_FORM } from '../../constants';
import {
  setCreateReportItemModalVisibility,
  setNewReportItem,
  createNewExpenseReportItem,
} from '../../actions';
import NewReportItemForm from './NewReportItemForm';
import { reportItemFormValidate as validate } from '../../../Validator';

class CreateReportItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onCreateReportItem = this.onCreateReportItem.bind(this);
  }

  onCreateReportItem = values => {
    const { dispatchSetNewReportItem, createExpenseReportItem } = this.props;
    const valuesForm = JSON.stringify(values, null, 2);
    const objectForm = JSON.parse(valuesForm);
    const objBuilder = {
      ExpenseId: '',
      TransactionDate: getDateByFormat(objectForm.ri_transaction_date, 'L'),
      ExpenseType: objectForm.riExpenseType,
      PaymentType: objectForm.ri_payment_Type ? objectForm.ri_payment_Type : '',
      Currency: '',
      Amount: objectForm.riAmount,
      BusinessPurpose: objectForm.ri_business_purpose,
      Comment: objectForm.ri_comment ? objectForm.ri_comment : '',
      Miles: objectForm.riMiles ? objectForm.riMiles : '',
      StandardMileageRate: objectForm.riStandardMileageRate,
      ProjectChargeable: '',
    };
    dispatchSetNewReportItem(objBuilder);
    createExpenseReportItem();
  };

  _closeModal = () => {
    const { dispatchModalStateVisibility, dispatchFormReset } = this.props;
    dispatchModalStateVisibility(false);
    dispatchFormReset(CREATE_REPORT_ITEM_FORM);
  };

  render() {
    const {
      modalOpen,
      submitting,
      pristine,
      invalid,
      handleSubmit,
    } = this.props;

    return (
      <FullPageModal
        visible={modalOpen}
        handleModalVisible={this._closeModal}
        modalHeaderText="Create Expense Report Item"
        modalHeaderRightComponent={
          <IconButton
            icon={() => (
              <FontAwesome5 name="check-circle" color="#FFF" size={25} solid />
            )}
            color="#FFF"
            onPress={handleSubmit(this.onCreateReportItem)}
            disabled={pristine || submitting || invalid}
          />
        }
      >
        <NewReportItemForm style={styles.container} />
      </FullPageModal>
    );
  }
}
CreateReportItem.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  dispatchModalStateVisibility: PropTypes.func.isRequired,
  dispatchSetNewReportItem: PropTypes.func.isRequired,
  createExpenseReportItem: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
  pristine: PropTypes.bool,
  invalid: PropTypes.bool,
  dispatchFormReset: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

const reduxFormExpense = reduxForm({
  form: CREATE_REPORT_ITEM_FORM,
  validate,
  enableReinitialize: false,
  destroyOnUnmount: false,
  keepDirtyOnReinitialize: true,
});

const styles = StyleSheet.create({
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    margin: 10,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  container: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    flex: 1,
  },
});
const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = dispatch => ({
  dispatchFormReset: formName => dispatch(reset(formName)),
  dispatchSetNewReportItem: value => dispatch(setNewReportItem(value)),
  createExpenseReportItem: () => dispatch(createNewExpenseReportItem()),
  dispatchModalStateVisibility: visibility =>
    dispatch(setCreateReportItemModalVisibility(visibility)),
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  reduxFormExpense,
)(CreateReportItem);
