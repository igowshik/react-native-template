import { createSelector } from 'reselect';

// Relative imports
import { IntialState } from './reducer';

const store = state =>
  state.expenseSecondaryScreenStore
    ? state.expenseSecondaryScreenStore
    : IntialState;

const selectExpenseItems = () =>
  createSelector(
    store,
    dataState => dataState.expenseItems,
  );

export { selectExpenseItems };
