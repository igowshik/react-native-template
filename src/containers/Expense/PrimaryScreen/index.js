import React, { Component } from 'react';
import { View } from 'react-native';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { withNavigation, withNavigationFocus } from 'react-navigation';

import Snackbar from 'cnxapp/src/components/Snackbar';
import ExpenseDashboard from './components/ExpenseDashboard';
import { getExpenseMetadata, setExpenseStatusQuery } from './actions';
import {
  selectExpenseMetadata,
  selectExpenseFilterQuery,
  selectToastVisibility,
  selectToastData,
} from './selectors';
import { GROUPED_EXPENSE_STATUS } from './constants';

class Expense extends Component {
  constructor(props) {
    super(props);
    this.navigateToHistory = this.navigateToHistory.bind(this);
  }

  componentDidMount() {
    const {
      fetchExpenseMetadata,
      dispatchSetExpenseListType,
      expenseQuery,
    } = this.props;
    fetchExpenseMetadata();
    dispatchSetExpenseListType({
      ...expenseQuery,
      Status: 'ALL',
    });
  }

  navigateToHistory = () => {
    const { navigation } = this.props;
    navigation.navigate('ExpenseHistory');
  };

  render() {
    const { toastVisible, toast } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <ExpenseDashboard navigateToHistory={this.navigateToHistory} />
        <Snackbar toastVisible={toastVisible} toast={toast} />
      </View>
    );
  }
}
Expense.propTypes = {
  fetchExpenseMetadata: PropTypes.func.isRequired,
  dispatchSetExpenseListType: PropTypes.func.isRequired,
  navigation: PropTypes.any,
  expenseQuery: PropTypes.object.isRequired,
  toastVisible: PropTypes.bool.isRequired,
  toast: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  metaData: selectExpenseMetadata(GROUPED_EXPENSE_STATUS),
  expenseQuery: selectExpenseFilterQuery(),
  toastVisible: selectToastVisibility(),
  toast: selectToastData(),
});
const mapDispatchToProps = dispatch => ({
  dispatchSetExpenseListType: expenseType =>
    dispatch(setExpenseStatusQuery(expenseType)),
  fetchExpenseMetadata: () => dispatch(getExpenseMetadata()),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withNavigation,
  withNavigationFocus,
  withConnect,
)(Expense);
