import { takeLatest, put, call, select } from 'redux-saga/effects';

// Absolute imports
import request from 'cnxapp/src/utils/request';
import config from 'cnxapp/src/config/config';
import { setRootGlobalLoader } from 'cnxapp/src/app/rootActions';

// Relative imports
import {
  saveIndConexions,
  saveOrgConexions,
  saveConexionNotesAction,
} from './actions';
import {
  GET_IND_CONEXIONS,
  GET_LIST_OF_ORG,
  GET_CONEXION_NOTES,
} from './constants';
import { selectToken } from './selectors';

function* getIndividualConexionAPI() {
  const accessToken = yield select(selectToken());
  const requestURL = `${config.apiURL}IndividualConexions`;
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  const data = yield call(request, requestURL, options);
  if (Array.isArray(data) && data.length > 0) {
    yield put(setRootGlobalLoader(false));
    yield put(saveIndConexions(data));
  } else {
    yield put(setRootGlobalLoader(false));
    console.log('Error occured',data);//eslint-disable-line
  }
}

function* getOrganizationConexionAPI() {
  const accessToken = yield select(selectToken());
  const requestURL = `${config.apiURL}OrganizationConexions`;
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  const data = yield call(request, requestURL, options);
  if (Array.isArray(data)) {
    yield put(setRootGlobalLoader(false));
    yield put(saveOrgConexions(data));
  } else {
    yield put(setRootGlobalLoader(false));
    console.log('Error occured',data);//eslint-disable-line
  }
}

function* getConexionNotesAPI({ conexionId }) {
  const accessToken = yield select(selectToken());
  const requestURL = `${
    config.apiURL
  }GetConexionNotes?conexionId=${conexionId}`;
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  const data = yield call(request, requestURL, options);
  if (Array.isArray(data)) {
    yield put(setRootGlobalLoader(false));
    yield put(saveConexionNotesAction(data));
  } else {
    yield put(setRootGlobalLoader(false));
    console.log('Error occured',data);//eslint-disable-line
  }
}

export default function* initConexionSaga() {
  yield takeLatest(GET_LIST_OF_ORG, getOrganizationConexionAPI);
  yield takeLatest(GET_IND_CONEXIONS, getIndividualConexionAPI);
  yield takeLatest(GET_CONEXION_NOTES, getConexionNotesAPI);
}
