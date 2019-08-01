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
} from './actions';
import {
  GET_EXPENSE,
  GET_EXP_REPORT_ITEMS,
  GET_EXP_REPORT_RECEIPTS,
} from './constants';
import {
  selectCurrentExpenseID,
  selectExpenseReportItemQuery,
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
    // const expenseStatus = yield select(selectExpenseMetadata(EXPENSE_STATUS));
    // response.data.ExpenseDetail.CurrentStatus = Lo.filter(expenseStatus, {
    //   Value: response.data.ExpenseDetail.CurrentStatus,
    // })[0].Text;
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

export default function* initConexionSaga() {
  yield takeLatest(GET_EXPENSE, getExpenseAPI);
  yield takeLatest(GET_EXP_REPORT_ITEMS, getExpReportItemsAPI);
  yield takeLatest(GET_EXP_REPORT_RECEIPTS, getExpReportReceiptsAPI);
}
