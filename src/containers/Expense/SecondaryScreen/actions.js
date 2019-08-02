import {
  GET_EXPENSE,
  SAVE_EXPENSE,
  GET_EXP_REPORT_ITEMS,
  SAVE_EXP_REPORT_ITEMS,
  GET_EXP_REPORT_RECEIPTS,
  SAVE_EXP_REPORT_RECEIPTS,
  SET_REPORT_ITEM_MODAL_VISIBILITY,
  SET_EXP_REPORT_ITEM,
  CREATE_EXP_REPORT_ITEM,
  SET_EXP_REPORT_ITEM_QUERY,
} from './constants';

export const getExpenseDetails = expenseId => ({
  type: GET_EXPENSE,
  expenseId,
});

export const saveExpenseDetails = expenseDetails => ({
  type: SAVE_EXPENSE,
  expenseDetails,
});
export const getExpenseReportItems = () => ({
  type: GET_EXP_REPORT_ITEMS,
});
export const setExpenseReportItemsQuery = pageNumber => ({
  type: SET_EXP_REPORT_ITEM_QUERY,
  pageNumber,
});
export const saveExpenseReportItems = items => ({
  type: SAVE_EXP_REPORT_ITEMS,
  items,
});
export const getExpenseReportReceipts = pageNumber => ({
  type: GET_EXP_REPORT_RECEIPTS,
  pageNumber,
});
export const saveExpenseReportReceipts = items => ({
  type: SAVE_EXP_REPORT_RECEIPTS,
  items,
});
export const setCreateReportItemModalVisibility = visibility => ({
  type: SET_REPORT_ITEM_MODAL_VISIBILITY,
  visibility,
});
export const setNewReportItem = form => ({
  type: SET_EXP_REPORT_ITEM,
  form,
});
export const createNewExpenseReportItem = () => ({
  type: CREATE_EXP_REPORT_ITEM,
});
