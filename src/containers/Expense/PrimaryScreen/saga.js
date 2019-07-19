import { takeLatest, put, call, select } from 'redux-saga/effects';

// Absolute imports
import request from 'cnxapp/src/utils/request';
import config from 'cnxapp/src/config/config';
import {
  setRootGlobalLoader,
  setToastMessage,
  setToastVisibility,
} from 'cnxapp/src/app/rootActions';
import { ERROR } from 'cnxapp/src/utils/constants';
import { saveExpenseList, saveExpenseSummary } from './actions';
import {
  GENERAL_ERROR,
  GET_EXPENSE_LIST,
  GET_EXPENSE_SUMMARY,
} from './constants';
import { selectToken, selectExpenseFilterQuery } from './selectors';
import { selectExpenseMetadata } from '../selectors';
import { mapGroupedStatusCodeRole, mapStatusCodeRole } from './mappers';
import { GROUPED_EXPENSE_STATUS, EXPENSE_STATUS } from '../constants';

function* getExpenseListAPI() {
  yield put(setRootGlobalLoader(true));
  const accessToken = yield select(selectToken());
  const payLoad = yield select(selectExpenseFilterQuery());
  const requestURL = `${config.apiURL}ExpenseList`;

  const options = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payLoad),
  };
  const response = yield call(request, requestURL, options);
  if (response.success) {
    yield put(setRootGlobalLoader(false));
    const expenseStatus = yield select(selectExpenseMetadata(EXPENSE_STATUS));
    const mappedStatus = mapStatusCodeRole(response.data, expenseStatus);
    yield put(saveExpenseList(mappedStatus));
  } else {
    yield put(
      setToastMessage({
        toastMessage: response.message ? response.message : GENERAL_ERROR,
        toastType: ERROR,
      }),
    );
    yield put(setRootGlobalLoader(false));
    yield put(setToastVisibility(true));
  }
}

function* getExpenseSummaryAPI() {
  yield put(setRootGlobalLoader(true));
  const accessToken = yield select(selectToken());

  const requestURL = `${config.apiURL}GetExpenseCountByStatus`;
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  const response = yield call(request, requestURL, options);

  if (response.success) {
    yield put(setRootGlobalLoader(false));
    const expenseStatus = yield select(
      selectExpenseMetadata(GROUPED_EXPENSE_STATUS),
    );
    const mappedStatus = mapGroupedStatusCodeRole(response.data, expenseStatus);
    yield put(saveExpenseSummary(mappedStatus));
  } else {
    yield put(
      setToastMessage({
        toastMessage: response.message ? response.message : GENERAL_ERROR,
        toastType: ERROR,
      }),
    );
    yield put(setRootGlobalLoader(false));
    yield put(setToastVisibility(true));
  }
}

export default function* initConexionSaga() {
  yield takeLatest(GET_EXPENSE_LIST, getExpenseListAPI);
  yield takeLatest(GET_EXPENSE_SUMMARY, getExpenseSummaryAPI);
}
