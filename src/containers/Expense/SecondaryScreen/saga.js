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
import { selectToken, selectExpenseId } from '../selectors';

import { saveExpenseItems } from './actions';
import { GENERAL_ERROR, GET_EXPENSE_ITEMS } from './constants';

function* getExpenseItemsAPI() {
  yield put(setRootGlobalLoader(true));
  const accessToken = yield select(selectToken());
  const expenseId = yield select(selectExpenseId());
  const requestURL = `${config.apiURL}GetExpenseItems?expenseId=${expenseId}`;
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  const response = yield call(request, requestURL, options);
  if (response.success) {
    yield put(setRootGlobalLoader(false));
    yield put(saveExpenseItems(response.data));
    // yield put(dispatchOrganisationDetails());
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
  yield takeLatest(GET_EXPENSE_ITEMS, getExpenseItemsAPI);
}
