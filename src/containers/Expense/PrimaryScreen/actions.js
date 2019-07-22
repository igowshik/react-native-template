import {
  GET_EXPENSE_LIST,
  SET_EXPENSE_LIST,
  SET_CREATE_EXPENSE_MODAL,
  SET_EXPENSE_SUMMARY,
  GET_EXPENSE_SUMMARY,
  SET_EXPENSE_STATUS,
} from './constants';

export const getExpenseList = pageNumber => ({
  type: GET_EXPENSE_LIST,
  pageNumber,
});

export const saveExpenseList = expenseList => ({
  type: SET_EXPENSE_LIST,
  expenseList,
});

export const setCreateExpenseModalVisibility = visibility => ({
  type: SET_CREATE_EXPENSE_MODAL,
  visibility,
});

export const saveExpenseSummary = summary => ({
  type: SET_EXPENSE_SUMMARY,
  summary,
});
export const getExpenseSummary = () => ({ type: GET_EXPENSE_SUMMARY });
export const setExpenseStatusFilter = selectedFilter => ({
  type: SET_EXPENSE_STATUS,
  selectedFilter,
});
