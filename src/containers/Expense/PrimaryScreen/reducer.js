import produce from 'immer';
import {
  GET_EXPENSE_LIST,
  SET_EXPENSE_LIST,
  SET_CREATE_EXPENSE_MODAL,
  SET_EXPENSE_SUMMARY,
  SET_EXPENSE_STATUS,
} from './constants';

export const IntialState = {
  individualConexions: [],
  expenseSummary: [],
  expenseList: [],
  createConexion: {
    data: {},
    types: '',
  },
  expenseFilter: {
    PageSize: 20,
    PageNumber: 1,
    Status: 'ALL',
  },
  createExpenseModelVisible: false,
};

const expensePrimaryScreenStore = (state = IntialState, action) =>
  produce(state, draft => {
    const draftState = draft;
    switch (action.type) {
      case GET_EXPENSE_LIST: {
        draftState.expenseFilter.PageNumber = action.pageNumber;
        break;
      }
      case SET_EXPENSE_LIST: {
        draftState.expenseList = action.expenseList;
        break;
      }
      case SET_CREATE_EXPENSE_MODAL: {
        draftState.createExpenseModelVisible = action.visibility;
        break;
      }
      case SET_EXPENSE_SUMMARY: {
        draftState.expenseSummary = action.summary;
        break;
      }
      case SET_EXPENSE_STATUS: {
        draftState.expenseFilter.Status = action.selectedFilter;
        break;
      }
      default: {
        // do nothing
      }
    }
  });

export default expensePrimaryScreenStore;
