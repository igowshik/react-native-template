import produce from 'immer';
import { SET_IND_CONEXIONS, GET_EXPENSE, SAVE_EXPENSE } from './constants';

export const IntialState = {
  individualConexions: [],
  createConexion: {
    data: {},
    types: '',
  },
  currentExpenseId: '',
  expenseDetails: {
    ExpenseDetail: {
      ExpenseId: null,
      CustomerId: null,
      ReportName: null,
      ReportDate: null,
      CostCenter: null,
      BusinessPurpose: null,
      CreatedBy: {
        Id: null,
        Name: null,
        Avatar: null,
      },
      CreatedDate: null,
      LastUpdatedDate: null,
      CurrentStatus: null,
      TotalAmount: null,
      BusinessUnit: null,
      ExpenseKey: null,
    },
    ExpenseHistories: {
      Data: [],
      PagingDetail: null,
    },
    ExpenseItems: {
      Data: [],
      PagingDetail: {
        TotalItems: 0,
        PageSize: 20,
        CurrentPageNumber: 1,
        TotalPages: 0,
      },
    },
    ExpenseReceipts: {
      Data: [],
      PagingDetail: {
        TotalItems: 0,
        PageSize: 20,
        CurrentPageNumber: 1,
        TotalPages: 0,
      },
    },
  },
};

const expenseSecondaryScreenStore = (state = IntialState, action) =>
  produce(state, draft => {
    const draftState = draft;
    switch (action.type) {
      case SET_IND_CONEXIONS: {
        draftState.individualConexions = action.indConexions;
        break;
      }
      case GET_EXPENSE: {
        draftState.currentExpenseId = action.expenseId;
        break;
      }
      case SAVE_EXPENSE: {
        draftState.expenseDetails = action.expenseDetails;
        break;
      }
      default: {
        // do nothing
      }
    }
  });

export default expenseSecondaryScreenStore;
