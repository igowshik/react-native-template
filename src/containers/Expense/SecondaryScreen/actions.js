import {
  GET_EXPENSE,
  SAVE_EXPENSE,
  GET_EXP_REPORT_ITEMS,
  SAVE_EXP_REPORT_ITEMS,
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
