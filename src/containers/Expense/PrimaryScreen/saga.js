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
import {
  saveExpenseList,
  saveExpenseSummary,
  saveExpenseMetaData,
  getExpenseSummary,
  setCreateExpenseModalVisibility,
  resetReduxForm,
  setExpensePageNumber,
  getExpenseList,
  saveExpenseHistoryList,
} from './actions';
import {
  GENERAL_ERROR,
  GET_EXPENSE_LIST,
  GET_EXPENSE_SUMMARY,
  GET_EXPENSE_METADATA,
  SET_NEW_EXPENSE,
  EXPENSE_FORM,
  UPDATE_EXPENSE_LIST,
  GET_EXPENSE_HISTORY,
} from './constants';
import { METADATA_VARIABLES, GROUPED_EXPENSE_STATUS } from '../constants';
import {
  selectExpenseFilterQuery,
  selectExpenseMetadata,
  selectNewExpense,
  selectExpenseHistoryQuery,
} from './selectors';
import { mapGroupedStatusCodeRole } from '../mappers';

function* getExpenseMetaDataAPI() {
  yield put(setRootGlobalLoader(true));
  const requestURL = `${
    config.apiURL
  }CodeRoleValues?roles=${METADATA_VARIABLES}`;
  const options = {
    method: 'GET',
  };
  const response = yield call(request, requestURL, options);

  if (response.success) {
    yield put(setRootGlobalLoader(false));
    yield put(saveExpenseMetaData(response.data));
    yield put(getExpenseSummary());
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

function* getExpenseListAPI() {
  yield put(setRootGlobalLoader(true));
  const payLoad = yield select(selectExpenseFilterQuery());

  const requestURL = `${config.apiURL}ExpenseList`;
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

    // const expenseStatus = yield select(selectExpenseMetadata(EXPENSE_STATUS));
    // const mappedStatus = mapStatusCodeRole(response.data, expenseStatus);
    yield put(saveExpenseList(response.data));
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

function* getExpenseSummaryAPI() {
  yield put(setRootGlobalLoader(true));
  const requestURL = `${config.apiURL}GetExpenseCountByStatus`;
  const options = {
    method: 'GET',
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
        toastMessage: response.message,
        toastType: ERROR,
      }),
    );
    yield put(setRootGlobalLoader(false));
    yield put(setToastVisibility(true));
  }
}
function* setNewExpenseAPI() {
  yield put(setRootGlobalLoader(true));
  const payLoad = yield select(selectNewExpense());
  const requestURL = `${config.apiURL}NewExpense`;
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
    yield put(getExpenseSummary());
    yield put(setExpensePageNumber(1));
    yield put(getExpenseList());
    yield put(resetReduxForm(EXPENSE_FORM));
    yield put(setCreateExpenseModalVisibility(false));
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
function* getExpenseHistoryAPI() {
  yield put(setRootGlobalLoader(true));
  const payLoad = yield select(selectExpenseHistoryQuery());
  const requestURL = `${config.apiURL}ExpenseList`;

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
    // const expenseStatus = yield select(selectExpenseMetadata(EXPENSE_STATUS));
    // const mappedStatus = mapStatusCodeRole(response.data, expenseStatus);
    yield put(saveExpenseHistoryList(response.data));
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
  yield takeLatest(GET_EXPENSE_LIST, getExpenseListAPI);
  yield takeLatest(GET_EXPENSE_SUMMARY, getExpenseSummaryAPI);
  yield takeLatest(GET_EXPENSE_METADATA, getExpenseMetaDataAPI);
  yield takeLatest(SET_NEW_EXPENSE, setNewExpenseAPI);
  yield takeLatest(UPDATE_EXPENSE_LIST, getExpenseListAPI);
  yield takeLatest(GET_EXPENSE_HISTORY, getExpenseHistoryAPI);
}
