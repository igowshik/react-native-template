import { takeLatest, put, call } from 'redux-saga/effects';

// Absolute imports
import request from 'cnxapp/src/utils/request';
import config from 'cnxapp/src/config/config';
import {
  setRootGlobalLoader,
  setToastMessage,
  setToastVisibility,
} from 'cnxapp/src/app/rootActions';
import { ERROR } from 'cnxapp/src/utils/constants';
import { saveIndConexions } from './actions';
import { GET_IND_CONEXIONS } from './constants';

function* getIndividualConexionAPI() {
  yield put(setRootGlobalLoader(true));
  const requestURL = `${config.apiURL}IndividualConexions`;
  const options = {
    method: 'GET',
  };
  const response = yield call(request, requestURL, options);
  if (response.success) {
    yield put(setRootGlobalLoader(false));
    yield put(saveIndConexions(response.data));
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
  yield takeLatest(GET_IND_CONEXIONS, getIndividualConexionAPI);
}
