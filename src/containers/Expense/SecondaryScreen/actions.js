import {
  GET_EXPENSE,
  SAVE_EXPENSE,
  GET_EXP_REPORT_ITEMS,
  SAVE_EXP_REPORT_ITEMS,
  GET_EXP_REPORT_RECEIPTS,
  SAVE_EXP_REPORT_RECEIPTS,
  SET_REPORT_ITEM_MODAL_VISIBILITY,
} from './constants';

export const getExpenseDetails = expenseId => ({
  type: GET_EXPENSE,
  expenseId,
});

export const saveExpenseDetails = expenseDetails => ({
  type: SAVE_EXPENSE,
  expenseDetails,
});
export const getExpenseReportItems = pageNumber => ({
  type: GET_EXP_REPORT_ITEMS,
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
