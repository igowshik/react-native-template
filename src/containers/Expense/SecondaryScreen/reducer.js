import produce from 'immer';
import {
  SET_IND_CONEXIONS,
  GET_EXPENSE,
  SAVE_EXPENSE,
  SAVE_EXP_REPORT_ITEMS,
  GET_EXP_REPORT_RECEIPTS,
  SAVE_EXP_REPORT_RECEIPTS,
  SET_REPORT_ITEM_MODAL_VISIBILITY,
  SET_EXP_REPORT_ITEM,
  SET_EXP_REPORT_ITEM_QUERY,
  EDIT_EXP_MODAL_VISIBILITY,
  TRIGGER_EXP_DELETE,
  SET_EDIT_EXP_OBJ,
  UPDATE_EXP_DETAILS,
} from './constants';

export const IntialState = {
  individualConexions: [],
  createConexion: {
    data: {},
    types: '',
  },
  expenseReportItemsQuery: { ExpenseId: 0, PageSize: 10, PageNumber: 1 },
  expenseReportReceiptsQuery: { ExpenseId: 0, PageSize: 10, PageNumber: 1 },
  currentExpenseId: '',
  createReportItemModalVisible: false,
  editExpenseModelVisibility: false,
  triggerExpenseDelete: false,
  newExpenseReportItem: {},
  editExpenseObject: {},
  expenseDetails: {
    ExpenseUIActions: {
      EnableDelete: false,
      EnableSubmit: false,
      EnableManagerApprove: false,
      EnableManagerReject: false,
      EnableReadyForPayment: false,
      EnableAdminReject: false,
      EnableArchive: false,
    },
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
      CurrentStatus: '',
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
        PageSize: 10,
        CurrentPageNumber: 1,
        TotalPages: 0,
      },
    },
    ExpenseReceipts: {
      Data: [],
      PagingDetail: {
        TotalItems: 0,
        PageSize: 10,
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
      case SET_EXP_REPORT_ITEM_QUERY: {
        draftState.expenseReportItemsQuery.PageNumber = action.pageNumber;
        draftState.expenseReportItemsQuery.ExpenseId =
          draftState.expenseDetails.ExpenseDetail.ExpenseId;
        break;
      }
      case SAVE_EXP_REPORT_ITEMS: {
        draftState.expenseDetails.ExpenseItems = action.items;
        break;
      }
      case GET_EXP_REPORT_RECEIPTS: {
        draftState.expenseReportReceiptsQuery.PageNumber = action.pageNumber;
        draftState.expenseReportReceiptsQuery.ExpenseId =
          draftState.expenseDetails.ExpenseDetail.ExpenseId;
        break;
      }
      case SAVE_EXP_REPORT_RECEIPTS: {
        draftState.expenseDetails.ExpenseReceipts = action.items;
        break;
      }
      case SET_REPORT_ITEM_MODAL_VISIBILITY: {
        draftState.createReportItemModalVisible = action.visibility;
        break;
      }
      case SET_EXP_REPORT_ITEM: {
        draftState.newExpenseReportItem = action.form;
        break;
      }
      case EDIT_EXP_MODAL_VISIBILITY: {
        draftState.editExpenseModelVisibility = action.visibility;
        break;
      }
      case TRIGGER_EXP_DELETE: {
        draftState.triggerExpenseDelete = action.value;
        break;
      }
      case SET_EDIT_EXP_OBJ: {
        draftState.editExpenseObject = action.value;
        break;
      }
      case UPDATE_EXP_DETAILS: {
        draftState.expenseDetails.ExpenseDetail = action.value;
        break;
      }
      default: {
        // do nothing
      }
    }
  });

export default expenseSecondaryScreenStore;
