import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, reset } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { IconButton } from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5Pro';

// Absolute imports
import FullPageModal from 'cnxapp/src/components/FullPageModal';
import { getDateByFormat } from 'cnxapp/src/utils/DateFormatter';

// Relative imports
import { createStructuredSelector } from 'reselect';
import { validate } from 'cnxapp/src/containers/Expense/Validator';

import { EDIT_EXPENSE_FORM } from '../../constants';
import {
  setEditExpenseModalVisibility,
  setEditExpenseObject,
  editExpense,
} from '../../actions';
import { selectEditModalOpen } from '../../selectors';
import CreateExpenseForm from '../../../PrimaryScreen/components/CreateExpense/CreateExpenseForm';

class EditExpense extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onEditExpense = this.onEditExpense.bind(this);
  }

  _closeModal = () => {
    const { dispatchEditExpenseModalState, dispatchFormReset } = this.props;
    dispatchEditExpenseModalState(false);
    dispatchFormReset(EDIT_EXPENSE_FORM);
  };

  onEditExpense = values => {
    const { dispatchSetEditExpenseObject, dispatchEditExpense } = this.props;
    const valuesForm = JSON.stringify(values, null, 2);
    const objectForm = JSON.parse(valuesForm);
    const objBuilder = {
      ReportName: objectForm.exp_report_name,
      ReportDate: getDateByFormat(objectForm.exp_report_date, 'L'),
      BusinessPurpose: objectForm.exp_business_purpose
        ? objectForm.exp_business_purpose
        : '',
      BusinessUnit: objectForm.exp_business_unit,
    };

    dispatchSetEditExpenseObject(objBuilder);
    dispatchEditExpense();
  };

  render() {
    const {
      modalOpen,
      handleSubmit,
      pristine,
      submitting,
      invalid,
    } = this.props;

    return (
      <FullPageModal
        visible={modalOpen}
        handleModalVisible={this._closeModal}
        modalHeaderText="Edit Expense"
        modalHeaderRightComponent={
          <IconButton
            icon={() => (
              <FontAwesome5 name="check-circle" color="#FFF" size={25} solid />
            )}
            color="#FFF"
            onPress={handleSubmit(this.onEditExpense)}
            disabled={pristine || submitting || invalid}
          />
        }
      >
        <CreateExpenseForm />
      </FullPageModal>
    );
  }
}

EditExpense.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  dispatchEditExpenseModalState: PropTypes.func.isRequired,
  dispatchSetEditExpenseObject: PropTypes.func.isRequired,
  dispatchEditExpense: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
  dispatchFormReset: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool,
  invalid: PropTypes.bool,
};

// export default reduxForm({
const redux = reduxForm({
  form: EDIT_EXPENSE_FORM,
  validate,
  enableReinitialize: true,
  destroyOnUnmount: true,
  keepDirtyOnReinitialize: false,
});
const mapStateToProps = createStructuredSelector({
  modalOpen: selectEditModalOpen(),
});

const mapDispatchToProps = dispatch => ({
  dispatchFormReset: formName => dispatch(reset(formName)),
  dispatchSetEditExpenseObject: value => dispatch(setEditExpenseObject(value)),
  dispatchEditExpense: () => dispatch(editExpense()),
  dispatchEditExpenseModalState: visibility =>
    dispatch(setEditExpenseModalVisibility(visibility)),
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withConnect,
  redux,
)(EditExpense);
