import { GET_EXPENSE, SAVE_EXPENSE } from './constants';

export const getExpenseDetails = expenseId => ({
  type: GET_EXPENSE,
  expenseId,
});

export const saveExpenseDetails = expenseDetails => ({
  type: SAVE_EXPENSE,
  expenseDetails,
});
