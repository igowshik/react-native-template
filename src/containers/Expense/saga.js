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
import { selectToken } from './selectors';
import { saveIndConexions } from './actions';
import { GENERAL_ERROR, GET_IND_CONEXIONS } from './constants';

function* getIndividualConexionAPI() {
  yield put(setRootGlobalLoader(true));
  const accessToken = yield select(selectToken());
  const requestURL = `${config.apiURL}IndividualConexions`;
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  const response = yield call(request, requestURL, options);
  if (response.success) {
    yield put(setRootGlobalLoader(false));
    yield put(saveIndConexions(response.data));
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
  yield takeLatest(GET_IND_CONEXIONS, getIndividualConexionAPI);
}
