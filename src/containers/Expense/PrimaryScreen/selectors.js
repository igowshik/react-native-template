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
const selectGlobalLoader = () =>
  createSelector(
    rootReducers,
    dataState => dataState.globalLoader,
  );
const selectToastVisibility = () =>
  createSelector(
    rootReducers,
    dataState => dataState.toastVisible,
  );

const selectToastData = () =>
  createSelector(
    rootReducers,
    dataState => dataState.toast,
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

const selectExpenseMetadata = codeRoleName =>
  createSelector(
    expenseReducers,
    dataState => dataState.expenseMetadata[codeRoleName],
  );
const selectNewExpense = () =>
  createSelector(
    expenseReducers,
    dataState => dataState.newExpense,
  );
const selectExpenseHistoryQuery = () =>
  createSelector(
    expenseReducers,
    dataState => dataState.expenseHistoryFilter,
  );
const selectExpenseHistory = () =>
  createSelector(
    expenseReducers,
    dataState => dataState.expenseHistoryList,
  );
const selectExpenseSearchQuery = () =>
  createSelector(
    expenseReducers,
    dataState => dataState.expenseSearch,
  );
export {
  selectToken,
  selectExpenseFilterQuery,
  selectExpenseList,
  selectCreateExpenseModelState,
  selectExpenseSummary,
  selectCurrentExpenseStatus,
  selectExpenseMetadata,
  selectGlobalLoader,
  selectNewExpense,
  selectExpenseHistoryQuery,
  selectExpenseHistory,
  selectExpenseSearchQuery,
  selectToastVisibility,
  selectToastData,
};
