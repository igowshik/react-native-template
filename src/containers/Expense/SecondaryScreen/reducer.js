import produce from 'immer';
import { SET_EXPENSE_ITEMS } from './constants';

export const IntialState = {
  expenseItems: [],
  createConexion: {
    data: {},
    types: '',
  },
};

const expenseSecondaryScreenStore = (state = IntialState, action) =>
  produce(state, draft => {
    const draftState = draft;
    switch (action.type) {
      case SET_EXPENSE_ITEMS: {
        draftState.expenseItems = action.expenseItems;
        break;
      }
      default: {
        // do nothing
      }
    }
  });

export default expenseSecondaryScreenStore;
