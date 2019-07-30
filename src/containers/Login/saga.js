import { call, put, takeLatest } from 'redux-saga/effects';

// Absolute imports
import request from 'cnxapp/src/utils/request';
import config from 'cnxapp/src/config/config';
import {
  setRootAccessToken,
  setToastMessage,
  setToastVisibility,
} from 'cnxapp/src/app/rootActions';
import { ERROR } from 'cnxapp/src/utils/constants';

import { GET_ACCESS_TOKEN } from './constants';
import { setAccessToken, setLoaderValue } from './actions';

function* getAccessToken({ userName, password }) {
  const requestURL = `${config.apiBaseURL}token`;
  const options = {
    method: 'POST',
    headers: {
      'cache-control': 'no-cache',
    },
    body: `grant_type=password&UserName=${userName}&Password=${password}`,
  };
  const data = yield call(request, requestURL, options);
  if (data && !data.access_token) {
    if (data.response) {
      yield put(
        setToastMessage({
          toastMessage: data.response.error_description,
          toastType: ERROR,
        }),
      );
    } else {
      yield put(
        setToastMessage({
          toastMessage: data.message,
          toastType: ERROR,
        }),
      );
    }

    yield put(setToastVisibility(true));
    yield put(setLoaderValue(false));
  } else if (data.access_token) {
    yield put(setLoaderValue(false));
    yield put(setAccessToken(data.access_token));
    yield put(setRootAccessToken(data.access_token));
  }
}

export default function* initLoginPageSaga() {
  yield takeLatest(GET_ACCESS_TOKEN, getAccessToken);
}
