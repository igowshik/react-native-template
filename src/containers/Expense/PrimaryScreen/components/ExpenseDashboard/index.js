import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native';
import { View } from 'native-base';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';

import Loader from 'cnxapp/src/components/Loader';
import * as colors from 'cnxapp/src/utils/colorsConstants';

import { withNavigation, withNavigationFocus } from 'react-navigation';
import AnalyticCard from './AnalyticCard';
import ExpenseFAB from '../ExpenseFAB';
import ExpenseList from '../ExpenseList';

import { setCreateExpenseModalVisibility } from '../../actions';
import CreateExpense from '../CreateExpense';
import {
  selectCreateExpenseModelState,
  selectExpenseSummary,
  selectCurrentExpenseStatus,
  selectGlobalLoader,
} from '../../selectors';

class ExpenseDashboard extends Component {
  constructor(props) {
    super(props);
    this.createExpenseTrigger = this.createExpenseTrigger.bind(this);
    this.triggerExpenseHistoryNavigation = this.triggerExpenseHistoryNavigation.bind(
      this,
    );
  }

  triggerExpenseHistoryNavigation = () => this.props.navigateToHistory();

  createExpenseTrigger = modalState => {
    this.props.dispatchCreateExpenseModalState(modalState);
  };

  renderDashboardCards = () => {
    const { expenseSummary } = this.props;
    const expenseCategory = [];
    expenseSummary.map(expense =>
      expenseCategory.push(
        <AnalyticCard
          key={expense.Status}
          status={expense.Status}
          title={expense.Description}
          value={expense.Count}
          subTitle={expense.Status === 'ALL' ? '' : 'Placeholder'}
        />,
      ),
    );
    return expenseCategory;
  };

  render() {
    const {
      loaderState,
      createExpenseModalVisible,
      isFocused,
      // navigateToHistory,
    } = this.props;
    const expenseIntialValues = {
      exp_report_date: new Date(),
    };
    return (
      <View style={{ flex: 1, backgroundColor: colors.BGCOLOR }}>
        <ScrollView
          style={{
            padding: 10,
            paddingBottom: 0,
            minHeight: 120,
            maxHeight: 120,
            maginTop: 15,
          }}
          alwaysBounceHorizontal
          horizontal
        >
          {this.renderDashboardCards()}
        </ScrollView>
        <ExpenseList />
        {isFocused ? (
          <ExpenseFAB
            handleExpenseCreate={this.createExpenseTrigger}
            handleExpenseHistoryPress={this.triggerExpenseHistoryNavigation}
          />
        ) : null}
        <Loader
          showLoader={loaderState}
          loaderTitle="Expense"
          loadingText="Loading expenses ..."
        />
        <CreateExpense
          modalOpen={createExpenseModalVisible}
          // setModalOpenClose={this.setCreateExpenseModalOpenClose}
          initialValues={expenseIntialValues}
        />
      </View>
    );
  }
}

ExpenseDashboard.propTypes = {
  loaderState: PropTypes.bool.isRequired,
  createExpenseModalVisible: PropTypes.bool.isRequired,
  dispatchCreateExpenseModalState: PropTypes.func.isRequired,
  expenseSummary: PropTypes.array.isRequired,
  isFocused: PropTypes.bool.isRequired,
  navigateToHistory: PropTypes.func.isRequired,
};

/**
 * @method: mapStateToProps()
 * @description: Redux Map method to map all redux state into each individual state value
 * @returns: jobState ans filterState in the State
 */
const mapStateToProps = createStructuredSelector({
  loaderState: selectGlobalLoader(),
  createExpenseModalVisible: selectCreateExpenseModelState(),
  expenseSummary: selectExpenseSummary(),
  currentStatus: selectCurrentExpenseStatus(),
});

const mapDispatchToProps = dispatch => ({
  dispatchCreateExpenseModalState: visibility =>
    dispatch(setCreateExpenseModalVisibility(visibility)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withNavigation,
  withNavigationFocus,
  withConnect,
)(ExpenseDashboard);
