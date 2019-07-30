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
import { saveExpenseDetails } from './actions';
import { GET_EXPENSE } from './constants';
import { selectCurrentExpenseID, selectExpenseMetadata } from './selectors';
import { mapStatusCodeRole } from '../mappers';
import { EXPENSE_STATUS } from '../constants';

function* getExpenseAPI() {
  yield put(setRootGlobalLoader(true));
  const expenseId = yield select(selectCurrentExpenseID());
  const requestURL = `${config.apiURL}GetExpense?expenseId=${expenseId}`;
  // console.log(requestURL);

  const options = {
    method: 'GET',
  };
  const response = yield call(request, requestURL, options);
  // console.log(response);
  if (response.success) {
    yield put(setRootGlobalLoader(false));
    const expenseStatus = yield select(selectExpenseMetadata(EXPENSE_STATUS));
    const mappedStatus = mapStatusCodeRole(response.data, expenseStatus);
    yield put(saveExpenseDetails(mappedStatus));
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
}
