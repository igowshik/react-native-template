import { createSelector } from 'reselect';

// Relative imports
import { rootInitialState } from 'cnxapp/src/app/rootReducer';
import { IntialState } from './reducer';

// Absolute imports
const rootReducers = state =>
  state.rootStore ? state.rootStore : rootInitialState;

const expenseReducers = state =>
  state.expensePrimaryScreenStore
    ? state.expensePrimaryScreenStore
    : IntialState;

// Root state selectors
const selectToken = () =>
  createSelector(
    rootReducers,
    dataState => dataState.accessToken,
  );
const selectExpenseFilterQuery = () =>
  createSelector(
    expenseReducers,
    dataState => dataState.expenseFilter,
  );
const selectExpenseList = () =>
  createSelector(
    expenseReducers,
    dataState => dataState.expenseList,
  );
const selectCreateExpenseModelState = () =>
  createSelector(
    expenseReducers,
    dataState => dataState.createExpenseModelVisible,
  );
const selectExpenseSummary = () =>
  createSelector(
    expenseReducers,
    dataState => dataState.expenseSummary,
  );
const selectCurrentExpenseStatus = () =>
  createSelector(
    expenseReducers,
    dataState => dataState.expenseFilter.Status,
  );
export {
  selectToken,
  selectExpenseFilterQuery,
  selectExpenseList,
  selectCreateExpenseModelState,
  selectExpenseSummary,
  selectCurrentExpenseStatus,
};
