import React, { Component } from 'react';
import { View } from 'react-native';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';

import ExpenseDashboard from './components/ExpenseDashboard';
import { getExpenseMetadata } from './actions';
import { selectExpenseMetadata } from './selectors';
import { GROUPED_EXPENSE_STATUS } from './constants';

class Expense extends Component {
  componentDidMount() {
    this.props.fetchExpenseMetadata();
  }

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
};

const mapStateToProps = createStructuredSelector({
  metaData: selectExpenseMetadata(GROUPED_EXPENSE_STATUS),
});
const mapDispatchToProps = dispatch => ({
  fetchExpenseMetadata: () => dispatch(getExpenseMetadata()),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(withConnect)(Expense);
