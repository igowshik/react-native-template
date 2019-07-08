import { GET_EXPENSE_ITEMS, SET_EXPENSE_ITEMS } from './constants';

export function getExpenseItems() {
  return { type: GET_EXPENSE_ITEMS };
}
export const saveExpenseItems = expenseItems => ({
  type: SET_EXPENSE_ITEMS,
  expenseItems,
});
