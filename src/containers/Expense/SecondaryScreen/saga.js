import { takeLatest, put, call, select } from 'redux-saga/effects';
// import Lo from 'lodash';
// Absolute imports
import request from 'cnxapp/src/utils/request';
import config from 'cnxapp/src/config/config';
import {
  setRootGlobalLoader,
  setToastMessage,
  setToastVisibility,
} from 'cnxapp/src/app/rootActions';
import { ERROR } from 'cnxapp/src/utils/constants';
import {
  saveExpenseDetails,
  saveExpenseReportItems,
  saveExpenseReportReceipts,
  setCreateReportItemModalVisibility,
  setTriggerExpenseDelete,
  updateExpenseDetails,
  setEditExpenseModalVisibility,
  getExpenseDetails,
} from './actions';
import {
  GET_EXPENSE,
  GET_EXP_REPORT_ITEMS,
  GET_EXP_REPORT_RECEIPTS,
  CREATE_EXP_REPORT_ITEM,
  DELETE_EXPENSE,
  EDIT_EXPENSE,
  SUBMIT_EXPENSE_REPORT,
} from './constants';
import {
  selectCurrentExpenseID,
  selectExpenseReportItemQuery,
  selectNewExpReportItem,
  selectExpenseDetails,
  selectEditExpenseObject,
} from './selectors';
import {
  getExpenseSummary,
  setExpensePageNumber,
  getExpenseList,
} from '../PrimaryScreen/actions';
// import { EXPENSE_STATUS } from '../constants';
// import { selectExpenseMetadata } from '../PrimaryScreen/selectors';

function* getExpenseAPI() {
  yield put(setRootGlobalLoader(true));
  const expenseId = yield select(selectCurrentExpenseID());
  const requestURL = `${config.apiURL}GetExpense?expenseId=${expenseId}`;

  const options = {
    method: 'GET',
  };
  const response = yield call(request, requestURL, options);
  if (response.success) {
    yield put(setRootGlobalLoader(false));
    yield put(saveExpenseDetails(response.data));
  } else {
    yield put(
      setToastMessage({
        toastMessage: response.message,
        toastType: ERROR,
      }),
    );
    yield put(setRootGlobalLoader(false));
    yield put(setToastVisibility(true));
  }
}

function* getExpReportItemsAPI() {
  yield put(setRootGlobalLoader(true));
  const expenseReportItemsQuery = yield select(selectExpenseReportItemQuery());
  const requestURL = `${config.apiURL}GetExpenseItems?expenseId=${
    expenseReportItemsQuery.ExpenseId
  }&pageSize=${expenseReportItemsQuery.PageSize}&pageNumber=${
    expenseReportItemsQuery.PageNumber
  }`;

  const options = {
    method: 'GET',
  };
  const response = yield call(request, requestURL, options);
  if (response.success) {
    yield put(setRootGlobalLoader(false));
    yield put(saveExpenseReportItems(response.data));
  } else {
    yield put(
      setToastMessage({
        toastMessage: response.message,
        toastType: ERROR,
      }),
    );
    yield put(setRootGlobalLoader(false));
    yield put(setToastVisibility(true));
  }
}

function* getExpReportReceiptsAPI() {
  yield put(setRootGlobalLoader(true));
  const expenseReportItemsQuery = yield select(selectExpenseReportItemQuery());
  const requestURL = `${config.apiURL}GetExpenseReceipts?expenseId=${
    expenseReportItemsQuery.ExpenseId
  }&pageSize=${expenseReportItemsQuery.PageSize}&pageNumber=${
    expenseReportItemsQuery.PageNumber
  }`;

  const options = {
    method: 'GET',
  };
  const response = yield call(request, requestURL, options);
  if (response.success) {
    yield put(setRootGlobalLoader(false));
    yield put(saveExpenseReportReceipts(response.data));
  } else {
    yield put(
      setToastMessage({
        toastMessage: response.message,
        toastType: ERROR,
      }),
    );
    yield put(setRootGlobalLoader(false));
    yield put(setToastVisibility(true));
  }
}
function* createExpReportItemAPI() {
  yield put(setRootGlobalLoader(true));
  const payLoad = yield select(selectNewExpReportItem());
  const expenseDetailsData = yield select(selectExpenseDetails());
  payLoad.ExpenseId = expenseDetailsData.ExpenseDetail.ExpenseId;
  const requestURL = `${config.apiURL}NewExpenseItem`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payLoad),
  };
  const response = yield call(request, requestURL, options);
  if (response.success) {
    yield put(setRootGlobalLoader(false));
    yield put(getExpenseDetails(expenseDetailsData.ExpenseDetail.ExpenseId));
    yield put(setCreateReportItemModalVisibility(false));
  } else {
    yield put(
      setToastMessage({
        toastMessage: response.message,
        toastType: ERROR,
      }),
    );
    yield put(setRootGlobalLoader(false));
    yield put(setToastVisibility(true));
  }
}
function* setDeleteExpenseAPI() {
  yield put(setRootGlobalLoader(true));
  const expenseDetailsData = yield select(selectExpenseDetails());
  const requestURL = `${config.apiURL}DeleteExpense?expenseId=${
    expenseDetailsData.ExpenseDetail.ExpenseId
  }`;

  const options = {
    method: 'DELETE',
  };
  const response = yield call(request, requestURL, options);
  if (response.success) {
    yield put(setRootGlobalLoader(false));
    yield put(getExpenseSummary());
    yield put(setExpensePageNumber(1));
    yield put(getExpenseList());
    yield put(setTriggerExpenseDelete(true));
  } else {
    yield put(
      setToastMessage({
        toastMessage: response.message,
        toastType: ERROR,
      }),
    );
    yield put(setRootGlobalLoader(false));
    yield put(setToastVisibility(true));
  }
}
function* setEditExpenseAPI() {
  yield put(setRootGlobalLoader(true));
  const payLoad = yield select(selectEditExpenseObject());
  const expenseDetailsData = yield select(selectExpenseDetails());
  payLoad.ExpenseId = expenseDetailsData.ExpenseDetail.ExpenseId;
  const requestURL = `${config.apiURL}EditExpense`;
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payLoad),
  };
  const response = yield call(request, requestURL, options);
  if (response.success) {
    yield put(setRootGlobalLoader(false));
    yield put(updateExpenseDetails(response.data));
    yield put(setEditExpenseModalVisibility(false));
  } else {
    yield put(
      setToastMessage({
        toastMessage: response.message,
        toastType: ERROR,
      }),
    );
    yield put(setRootGlobalLoader(false));
    yield put(setToastVisibility(true));
  }
}
function* submitExpenseAPI() {
  yield put(setRootGlobalLoader(true));
  const expenseDetailsData = yield select(selectExpenseDetails());
  const payLoad = {
    ExpenseId: expenseDetailsData.ExpenseDetail.ExpenseId,
    Status: 'SUBM',
    Comment: '',
  };
  const requestURL = `${config.apiURL}ChangeExpenseStatus`;
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payLoad),
  };
  const response = yield call(request, requestURL, options);
  if (response.success) {
    yield put(setRootGlobalLoader(false));
    yield put(getExpenseDetails(expenseDetailsData.ExpenseDetail.ExpenseId));
  } else {
    yield put(
      setToastMessage({
        toastMessage: response.message,
        toastType: ERROR,
      }),
    );
    yield put(setRootGlobalLoader(false));
    yield put(setToastVisibility(true));
  }
}
export default function* initConexionSaga() {
  yield takeLatest(GET_EXPENSE, getExpenseAPI);
  yield takeLatest(GET_EXP_REPORT_ITEMS, getExpReportItemsAPI);
  yield takeLatest(GET_EXP_REPORT_RECEIPTS, getExpReportReceiptsAPI);
  yield takeLatest(CREATE_EXP_REPORT_ITEM, createExpReportItemAPI);
  yield takeLatest(DELETE_EXPENSE, setDeleteExpenseAPI);
  yield takeLatest(EDIT_EXPENSE, setEditExpenseAPI);
  yield takeLatest(SUBMIT_EXPENSE_REPORT, submitExpenseAPI);
}
