import { takeLatest, put, call, select } from 'redux-saga/effects';
// absoute imports
import request from 'cnxapp/src/utils/request';
import config from 'cnxapp/src/config/config';
import {
  setRootGlobalLoader,
  setToastMessage,
  setToastVisibility,
} from 'cnxapp/src/app/rootActions';
import { ERROR } from 'cnxapp/src/utils/constants';

// relative imports
import {
  saveMyChannelList,
  saveSharedChannelList,
  saveGetinteractions,
  getSharedChannelList,
  getInteractionsList,
} from './actions';
import {
  GET_MY_CHANNEL_LIST,
  GENERAL_ERROR,
  GET_SHARED_CHANNEL_LIST,
  GET_INTERACTIONS,
} from './constants';
import { selectToken } from './selectors';

function* getMyChannelListAPI() {
  yield put(setRootGlobalLoader(true));
  const accessToken = yield select(selectToken());
  const requestURL = `${config.apiURL}MyChannelList`;
  const options = {
    method: 'GET',
    headers: { Authorization: `Bearer ${accessToken}` },
  };
  const response = yield call(request, requestURL, options);
  if (response.data) {
    yield put(setRootGlobalLoader(false));
    yield put(saveMyChannelList(response.data));
    yield put(getSharedChannelList());
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

function* getSharedChannelAPI() {
  yield put(setRootGlobalLoader(true));
  const accessToken = yield select(selectToken());
  const requestURL = `${config.apiURL}SharedChannelsList`;
  const options = {
    method: 'GET',
    headers: { Authorization: `Bearer ${accessToken}` },
  };
  const response = yield call(request, requestURL, options);
  if (response.data) {
    yield put(saveSharedChannelList(response.data));
    yield put(getInteractionsList());
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
function* getInteractionsAPI() {
  yield put(setRootGlobalLoader(true));
  const accessToken = yield select(selectToken());
  const requestURL = `${config.apiURL}GetInteractions`;
  const options = {
    method: 'GET',
    headers: { Authorization: `Bearer ${accessToken}` },
  };
  const response = yield call(request, requestURL, options);
  if (response.data) {
    yield put(saveGetinteractions(response.data));
  } else {
    yield put(setRootGlobalLoader(false));
    yield put(setToastVisibility(true));
  }
}

export default function* dashboardSaga() {
  yield takeLatest(GET_MY_CHANNEL_LIST, getMyChannelListAPI);
  yield takeLatest(GET_SHARED_CHANNEL_LIST, getSharedChannelAPI);
  yield takeLatest(GET_INTERACTIONS, getInteractionsAPI);
}
