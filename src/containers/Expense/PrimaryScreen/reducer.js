import produce from 'immer';
import {
  GET_EXPENSE_LIST,
  SET_EXPENSE_LIST,
  SET_CREATE_EXPENSE_MODAL,
  SET_EXPENSE_SUMMARY,
  SET_EXPENSE_STATUS,
  SAVE_EXPENSE_METADATA,
  SET_NEW_EXPENSE,
} from './constants';

export const IntialState = {
  individualConexions: [],
  expenseSummary: [],
  expenseList: [],
  expenseMetadata: {
    expense_status: [],
    expense_type: [],
    payment_method: [],
    costcenter: [],
    business_unit: [],
    expense_item_project_chargeable: [],
  },
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
  newExpense: {},
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
      case SAVE_EXPENSE_METADATA: {
        draftState.expenseMetadata = action.metadata;
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
      case SET_NEW_EXPENSE: {
        draftState.newExpense = action.value;
        break;
      }
      default: {
        // do nothing
      }
    }
  });

export default expensePrimaryScreenStore;
