import { createSelector } from 'reselect';

// Relative imports
// import { rootInitialState } from 'cnxapp/src/app/rootReducer';
import { IntialState } from './reducer';

// const rootReducers = state =>
//   state.rootStore ? state.rootStore : rootInitialState;

const expenseReducers = state =>
  state.expenseSecondaryScreenStore
    ? state.expenseSecondaryScreenStore
    : IntialState;

// const store = state =>
//   state.expenseSecondaryScreenStore
//     ? state.expenseSecondaryScreenStore
//     : IntialState;

const selectCurrentExpenseID = () =>
  createSelector(
    expenseReducers,
    dataState => dataState.currentExpenseId,
  );
const selectExpenseDetails = () =>
  createSelector(
    expenseReducers,
    dataState => dataState.expenseDetails,
  );
const selectExpenseReportItemQuery = () =>
  createSelector(
    expenseReducers,
    dataState => dataState.expenseReportItemsQuery,
  );
const selectReportItemModalVisibility = () =>
  createSelector(
    expenseReducers,
    dataState => dataState.createReportItemModalVisible,
  );
const selectNewExpReportItem = () =>
  createSelector(
    expenseReducers,
    dataState => dataState.newExpenseReportItem,
  );
const selectEditModalOpen = () =>
  createSelector(
    expenseReducers,
    dataState => dataState.editExpenseModelVisibility,
  );
const selectTriggerExpenseDelete = () =>
  createSelector(
    expenseReducers,
    dataState => dataState.triggerExpenseDelete,
  );
const selectEditExpenseObject = () =>
  createSelector(
    expenseReducers,
    dataState => dataState.editExpenseObject,
  );
const selectDeleteReportItemId = () =>
  createSelector(
    expenseReducers,
    dataState => dataState.deleteReportItemId,
  );
export {
  selectCurrentExpenseID,
  selectExpenseDetails,
  selectExpenseReportItemQuery,
  selectReportItemModalVisibility,
  selectNewExpReportItem,
  selectEditModalOpen,
  selectTriggerExpenseDelete,
  selectEditExpenseObject,
  selectDeleteReportItemId,
};
