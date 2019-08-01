import produce from 'immer';
import {
  SET_IND_CONEXIONS,
  GET_EXPENSE,
  SAVE_EXPENSE,
  GET_EXP_REPORT_ITEMS,
  SAVE_EXP_REPORT_ITEMS,
  GET_EXP_REPORT_RECEIPTS,
  SAVE_EXP_REPORT_RECEIPTS,
  SET_REPORT_ITEM_MODAL_VISIBILITY,
} from './constants';

export const IntialState = {
  individualConexions: [],
  createConexion: {
    data: {},
    types: '',
  },
  expenseReportItemsQuery: {
    ExpenseId: 0,
    PageSize: 20,
    PageNumber: 1,
  },
  expenseReportReceiptsQuery: { ExpenseId: 0, PageSize: 20, PageNumber: 1 },
  currentExpenseId: '',
  createReportItemModalVisible: false,
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
      case GET_EXP_REPORT_ITEMS: {
        draftState.expenseReportItemsQuery.PageNumber = action.pageNumber;
        draftState.expenseReportItemsQuery.ExpenseId =
          draftState.expenseDetails.ExpenseDetail.ExpenseId;
        break;
      }
      case SAVE_EXP_REPORT_ITEMS: {
        draftState.expenseDetails.ExpenseItems.data = action.items;
        break;
      }
      case GET_EXP_REPORT_RECEIPTS: {
        draftState.expenseReportReceiptsQuery.PageNumber = action.pageNumber;
        draftState.expenseReportReceiptsQuery.ExpenseId =
          draftState.expenseDetails.ExpenseDetail.ExpenseId;
        break;
      }
      case SAVE_EXP_REPORT_RECEIPTS: {
        draftState.expenseDetails.ExpenseReceipts.data = action.items;
        break;
      }
      case SET_REPORT_ITEM_MODAL_VISIBILITY: {
        draftState.createReportItemModalVisible = action.visibility;
        break;
      }
      default: {
        // do nothing
      }
    }
  });

export default expenseSecondaryScreenStore;
