import { createSelector } from 'reselect';

// Relative imports
import { rootInitialState } from 'cnxapp/src/app/rootReducer';
import { IntialState } from './reducer';

const rootReducers = state =>
  state.rootStore ? state.rootStore : rootInitialState;

const expenseReducers = state =>
  state.expenseSecondaryScreenStore
    ? state.expenseSecondaryScreenStore
    : IntialState;

const selectGlobalLoader = () =>
  createSelector(
    rootReducers,
    dataState => dataState.globalLoader,
  );

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
const selectEditExpItemModalVisibility = () =>
  createSelector(
    expenseReducers,
    dataState => dataState.editReportItemModalVisible,
  );
const selectEditExpenseItem = () =>
  createSelector(
    expenseReducers,
    dataState => dataState.editExpenseReportItem,
  );
const selectNewExpReceipt = () =>
  createSelector(
    expenseReducers,
    dataState => dataState.newExpenseReceipt,
  );
const selectDeleteExpReceiptId = () =>
  createSelector(
    expenseReducers,
    dataState => dataState.deleteExpReceiptId,
  );
const selectPdfViewerVisible = () =>
  createSelector(
    expenseReducers,
    dataState => dataState.pdfReceiptViewerVisible,
  );
export {
  selectGlobalLoader,
  selectCurrentExpenseID,
  selectExpenseDetails,
  selectExpenseReportItemQuery,
  selectReportItemModalVisibility,
  selectNewExpReportItem,
  selectEditModalOpen,
  selectTriggerExpenseDelete,
  selectEditExpenseObject,
  selectDeleteReportItemId,
  selectEditExpItemModalVisibility,
  selectEditExpenseItem,
  selectNewExpReceipt,
  selectDeleteExpReceiptId,
  selectPdfViewerVisible,
};
