import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Button } from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5Pro';
import { reduxForm, reset } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';

// Absolute imports
import FullPageModal from 'cnxapp/src/components/FullPageModal';
import * as colors from 'cnxapp/src/utils/colorsConstants';
import { getDateByFormat } from 'cnxapp/src/utils/DateFormatter';
import { createStructuredSelector } from 'reselect';
import CreateExpenseForm from './CreateExpenseForm';
import { validate } from '../../../Validator';
import { setNewExpense, setCreateExpenseModalVisibility } from '../../actions';
import { EXPENSE_FORM } from '../../constants';

class CreateExpense extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onCreateExpense = this.onCreateExpense.bind(this);
  }

  onCreateExpense = values => {
    const { createNewExpense } = this.props;
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
    createNewExpense(objBuilder);
  };

  _closeModal = () => {
    const { dispatchCreateExpenseModalState, dispatchFormReset } = this.props;
    dispatchCreateExpenseModalState(false);
    dispatchFormReset(EXPENSE_FORM);
  };

  render() {
    const { modalOpen, submitting, handleSubmit } = this.props;
    return (
      <FullPageModal
        visible={modalOpen}
        handleModalVisible={this._closeModal}
        modalHeaderText="Create Expense"
      >
        <View style={styles.headerContainer}>
          <Button
            raised
            onPress={handleSubmit(this.onCreateExpense)}
            disabled={submitting}
            mode="contained"
            color={colors.BLUE}
            icon={() => (
              <FontAwesome5 name="check" color="#fff" size={18} light />
            )}
          >
            Done
          </Button>
        </View>
        <CreateExpenseForm style={styles.container} />
      </FullPageModal>
    );
  }
}
CreateExpense.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  dispatchCreateExpenseModalState: PropTypes.func.isRequired,
  createNewExpense: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
  dispatchFormReset: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

const reduxFormExpense = reduxForm({
  form: EXPENSE_FORM,
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
  createNewExpense: value => dispatch(setNewExpense(value)),
  dispatchCreateExpenseModalState: visibility =>
    dispatch(setCreateExpenseModalVisibility(visibility)),
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  reduxFormExpense,
)(CreateExpense);
