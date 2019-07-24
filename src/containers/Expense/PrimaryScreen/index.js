import React, { Component } from 'react';
import { View } from 'react-native';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { withNavigation, withNavigationFocus } from 'react-navigation';

import ExpenseDashboard from './components/ExpenseDashboard';
import { getExpenseMetadata, setExpenseStatusFilter } from './actions';
import { selectExpenseMetadata } from './selectors';
import { GROUPED_EXPENSE_STATUS } from './constants';

class Expense extends Component {
  // constructor(props) {
  //   super(props);
  //   this.navigateToHistory = this.navigateToHistory.bind(this);
  // }

  componentDidMount() {
    const { fetchExpenseMetadata, dispatchSetExpenseListType } = this.props;
    fetchExpenseMetadata();
    dispatchSetExpenseListType('ALL');
  }

  // navigateToHistory = () => {
  //   const { navigation } = this.props;
  //   navigation.navigate('ExpenseHistory');
  // };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ExpenseDashboard />
      </View>
    );
  }
}
Expense.propTypes = {
  fetchExpenseMetadata: PropTypes.func.isRequired,
  dispatchSetExpenseListType: PropTypes.func.isRequired,
  // navigation: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  metaData: selectExpenseMetadata(GROUPED_EXPENSE_STATUS),
});
const mapDispatchToProps = dispatch => ({
  dispatchSetExpenseListType: expenseType =>
    dispatch(setExpenseStatusFilter(expenseType)),
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
