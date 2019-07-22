import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native';
import { View } from 'native-base';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';

import Loader from 'cnxapp/src/components/Loader';

import AnalyticCard from './AnalyticCard';
import ExpenseFAB from '../ExpenseFAB';
import ExpenseList from '../ExpenseList';
import { selectGlobalLoader, selectExpenseMetadata } from '../../../selectors';
import {
  setCreateExpenseModalVisibility,
  getExpenseSummary,
} from '../../actions';
import CreateExpense from '../CreateExpense';
import {
  selectCreateExpenseModelState,
  selectExpenseSummary,
  selectCurrentExpenseStatus,
} from '../../selectors';
import { getExpenseMetadata } from '../../../actions';

class ExpenseDashboard extends Component {
  constructor(props) {
    super(props);
    this.createExpenseTrigger = this.createExpenseTrigger.bind(this);
  }

  componentDidMount() {
    const { dispatchGetExpenseSummary, fetchExpenseMetadata } = this.props;
    fetchExpenseMetadata();
    dispatchGetExpenseSummary();
  }

  createExpenseTrigger = () => {
    // this.setCreateExpenseModalOpenClose(modalState);
    // this.setState({ createExpenseVisible: modalState });
  };

  setCreateExpenseModalOpenClose = value => {
    const { dispatchCreateExpenseModalState } = this.props;
    dispatchCreateExpenseModalState(value);
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
          // isSelected={currentStatus === expense.Status}
        />,
      ),
    );
    return expenseCategory;
  };

  render() {
    const { loaderState, createExpenseModalVisible } = this.props;
    return (
      <View style={{ height: '100%' }}>
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
        <ExpenseFAB handleExpenseCreate={this.createExpenseTrigger} />
        <Loader
          showLoader={loaderState}
          loaderTitle="Expense"
          loadingText="Loading expenses ..."
        />
        <CreateExpense
          modalOpen={createExpenseModalVisible}
          setModalOpenClose={this.setCreateExpenseModalOpenClose}
          // handleSubmit={() => this.setState({ createExpenseVisible: false })}
        />
      </View>
    );
  }
}

ExpenseDashboard.propTypes = {
  loaderState: PropTypes.bool.isRequired,
  createExpenseModalVisible: PropTypes.bool.isRequired,
  dispatchCreateExpenseModalState: PropTypes.func.isRequired,
  dispatchGetExpenseSummary: PropTypes.func.isRequired,
  expenseSummary: PropTypes.array.isRequired,
  fetchExpenseMetadata: PropTypes.func.isRequired,
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
  metaData: selectExpenseMetadata(),
});

const mapDispatchToProps = dispatch => ({
  dispatchCreateExpenseModalState: visibility =>
    dispatch(setCreateExpenseModalVisibility(visibility)),
  dispatchGetExpenseSummary: () => dispatch(getExpenseSummary()),
  fetchExpenseMetadata: () => dispatch(getExpenseMetadata()),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ExpenseDashboard);
