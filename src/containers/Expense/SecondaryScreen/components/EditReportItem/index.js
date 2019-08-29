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

import { EDIT_REPORT_ITEM_FORM } from '../../constants';
import {
  editExpenseReportItem,
  setEditReportItemModalVisibility,
  setEditReportItem,
} from '../../actions';
import EditReportItemForm from './EditReportItemForm';
import { reportItemFormValidate as validate } from '../../../Validator';
import {
  selectGlobalLoader,
  selectEditExpItemModalVisibility,
  selectExpenseDetails,
} from '../../selectors';

class EditReportItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attachmentModified: false,
    };
    this.onEditReportItem = this.onEditReportItem.bind(this);
  }

  onEditReportItem = values => {
    const EMPTY = '';
    const {
      dispatchSetEditReportItem,
      dispatchEditExpenseReportItem,
      expenseDetailsData,
      reportItem,
    } = this.props;
    const valuesForm = JSON.stringify(values, null, 2);
    const objectForm = JSON.parse(valuesForm);

    const objBuilder = {
      ExpenseId: expenseDetailsData.ExpenseDetail.ExpenseId,
      ExpenseItemId: reportItem.ExpenseItemId,
      TransactionDate: getDateByFormat(objectForm.ri_transaction_date, 'L'),
      ExpenseType: objectForm.riExpenseType,
      PaymentType: objectForm.ri_payment_Type || EMPTY,
      Currency: EMPTY,
      Amount: objectForm.riAmount,
      BusinessPurpose: objectForm.ri_business_purpose,
      Comment: objectForm.ri_comment || EMPTY,
      Miles: objectForm.riMiles || EMPTY,
      StandardMileageRate: objectForm.riStandardMileageRate,
      ProjectChargeable: EMPTY,
      IsReceiptDeleted: this.state.attachmentModified,
      Receipts: [],
    };
    if (
      objectForm.riExpReceipt.length > 0 &&
      !this.isUrl(objectForm.riExpReceipt[0])
    ) {
      objBuilder.Receipts.push(objectForm.riExpReceipt[0]);
    }
    dispatchSetEditReportItem(objBuilder);
    dispatchEditExpenseReportItem();
  };

  isUrl(s) {
    const regexp = /(ftp|http|https):/;
    return regexp.test(s);
  }

  handleAttchmentChanged = attachmentChanged =>
    this.setState({ attachmentModified: attachmentChanged });

  _closeModal = () => {
    const { dispatchModalStateVisibility, dispatchFormReset } = this.props;
    dispatchModalStateVisibility(false);
    dispatchFormReset(EDIT_REPORT_ITEM_FORM);
  };

  render() {
    const {
      modalOpen,
      submitting,
      pristine,
      invalid,
      handleSubmit,
      loader,
    } = this.props;

    return (
      <FullPageModal
        visible={modalOpen}
        handleModalVisible={this._closeModal}
        modalHeaderText="Edit Expense Report Item"
        modalHeaderRightComponent={
          <IconButton
            icon={() => (
              <FontAwesome5 name="check-circle" color="#FFF" size={25} solid />
            )}
            color="#FFF"
            onPress={handleSubmit(this.onEditReportItem)}
            disabled={pristine || submitting || invalid}
          />
        }
        loader={loader}
      >
        <EditReportItemForm
          style={styles.container}
          attachmentChanged={this.handleAttchmentChanged}
        />
      </FullPageModal>
    );
  }
}
EditReportItem.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  dispatchModalStateVisibility: PropTypes.func.isRequired,
  dispatchSetEditReportItem: PropTypes.func.isRequired,
  dispatchEditExpenseReportItem: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
  pristine: PropTypes.bool,
  invalid: PropTypes.bool,
  dispatchFormReset: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  loader: PropTypes.bool.isRequired,
  expenseDetailsData: PropTypes.object.isRequired,
  reportItem: PropTypes.object,
};

const reduxFormExpense = reduxForm({
  form: EDIT_REPORT_ITEM_FORM,
  validate,
  enableReinitialize: true,
  destroyOnUnmount: true,
  keepDirtyOnReinitialize: false,
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
const mapStateToProps = createStructuredSelector({
  loader: selectGlobalLoader(),
  modalOpen: selectEditExpItemModalVisibility(),
  expenseDetailsData: selectExpenseDetails(),
});

const mapDispatchToProps = dispatch => ({
  dispatchFormReset: formName => dispatch(reset(formName)),
  dispatchSetEditReportItem: value => dispatch(setEditReportItem(value)),
  dispatchEditExpenseReportItem: () => dispatch(editExpenseReportItem()),
  dispatchModalStateVisibility: visibility =>
    dispatch(setEditReportItemModalVisibility(visibility)),
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  reduxFormExpense,
)(EditReportItem);
