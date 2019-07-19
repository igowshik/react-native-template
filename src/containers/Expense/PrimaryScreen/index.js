import React, { Component } from 'react';
import { View } from 'react-native';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ExpenseDashboard from './components/ExpenseDashboard';
import { getExpenseMetadata } from '../actions';
import { selectExpenseMetadata } from '../selectors';

class Expense extends Component {
  componentDidMount() {}

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ExpenseDashboard />
      </View>
    );
  }
}
Expense.propTypes = {};

const mapStateToProps = createStructuredSelector({
  metaData: selectExpenseMetadata(),
});
const mapDispatchToProps = dispatch => ({
  fetchExpenseMetadata: () => dispatch(getExpenseMetadata()),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(withConnect)(Expense);
