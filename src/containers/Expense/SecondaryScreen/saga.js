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
  getExpenseReportItems,
  setExpenseReportItemsQuery,
} from './actions';
import {
  GET_EXPENSE,
  GET_EXP_REPORT_ITEMS,
  GET_EXP_REPORT_RECEIPTS,
  CREATE_EXP_REPORT_ITEM,
} from './constants';
import {
  selectCurrentExpenseID,
  selectExpenseReportItemQuery,
  selectNewExpReportItem,
  selectExpenseDetails,
} from './selectors';
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
    yield put(setExpenseReportItemsQuery(1));
    yield put(getExpenseReportItems());
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

export default function* initConexionSaga() {
  yield takeLatest(GET_EXPENSE, getExpenseAPI);
  yield takeLatest(GET_EXP_REPORT_ITEMS, getExpReportItemsAPI);
  yield takeLatest(GET_EXP_REPORT_RECEIPTS, getExpReportReceiptsAPI);
  yield takeLatest(CREATE_EXP_REPORT_ITEM, createExpReportItemAPI);
}
