import { reset } from 'redux-form';

import {
  GET_EXPENSE_LIST,
  SET_EXPENSE_LIST,
  SET_CREATE_EXPENSE_MODAL,
  SET_EXPENSE_SUMMARY,
  GET_EXPENSE_SUMMARY,
  SET_EXPENSE_STATUS,
  SAVE_EXPENSE_METADATA,
  GET_EXPENSE_METADATA,
  SET_NEW_EXPENSE,
} from './constants';

export const saveExpenseMetaData = metadata => ({
  type: SAVE_EXPENSE_METADATA,
  metadata,
});

export const getExpenseMetadata = () => ({ type: GET_EXPENSE_METADATA });

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
export const setNewExpense = value => ({ type: SET_NEW_EXPENSE, value });

export const resetReduxForm = formName => reset(formName);
