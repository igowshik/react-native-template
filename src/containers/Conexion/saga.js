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

// Relative imports
import {
  saveIndConexions,
  saveOrgConexions,
  saveConexionNotesAction,
  saveConexionDetails,
  saveMetaData,
  getConexionDetails,
  setAddressModalVisibility,
  //----
  setIndividualModalVisibility,
} from './actions';
import {
  GET_IND_CONEXIONS,
  GET_LIST_OF_ORG,
  GET_CONEXION_NOTES,
  GENERAL_ERROR,
  GET_CONEXION_DETAILS,
  FETCH_DD_METADATA,
  METADATA_VARIABLES,
  DELETE_ADDRESS,
  CREATE_CONEXION_ADDRESS,
  CREATE_INDIVIDUAL,
} from './constants';
import {
  selectToken,
  selectConexionId,
  selectCreateAddressData,
  selectIndividualDetails,
} from './selectors';

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

function* getOrganizationConexionAPI() {
  yield put(setRootGlobalLoader(true));
  const accessToken = yield select(selectToken());
  const requestURL = `${config.apiURL}OrganizationConexions`;
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  const response = yield call(request, requestURL, options);
  if (response.success) {
    yield put(setRootGlobalLoader(false));
    yield put(saveOrgConexions(response.data));
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

function* getConexionNotesAPI({ conexionId }) {
  yield put(setRootGlobalLoader(true));
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
    // yield put(
    //   setToastMessage({
    //     toastMessage: data.message,
    //     toastType: ERROR,
    //   }),
    // );
    yield put(setRootGlobalLoader(false));
    // yield put(setToastVisibility(true));
  }
}

function* getConexionDetailsAPI() {
  yield put(setRootGlobalLoader(true));
  const accessToken = yield select(selectToken());
  const conexionId = yield select(selectConexionId());
  const requestURL = `${config.apiURL}ConexionDetail?conexionId=${conexionId}`;
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  const response = yield call(request, requestURL, options);
  if (response.success) {
    yield put(setRootGlobalLoader(false));
    yield put(saveConexionDetails(response.data));
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

function* getConexionMetaDataAPI() {
  yield put(setRootGlobalLoader(true));
  const accessToken = yield select(selectToken());
  const requestURL = `${
    config.apiURL
  }CodeRoleValues?roles=${METADATA_VARIABLES}`;
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  const response = yield call(request, requestURL, options);
  if (response.success) {
    yield put(setRootGlobalLoader(false));
    yield put(saveMetaData(response.data));
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

function* createConexionAddressAPI() {
  yield put(setRootGlobalLoader(true));
  const accessToken = yield select(selectToken());
  const conexionId = yield select(selectConexionId());
  const addressData = yield select(selectCreateAddressData());
  const requestURL = `${config.apiURL}NewConexionAddress`;
  const CREATE_ADDRESS = {
    ConexionId: conexionId,
    AddressType: addressData.address_type,
    Line1Address: addressData.line_1_address,
    City: addressData.city,
    State: addressData.state,
    PostalArea: addressData.postal_area,
    PostalArea2: addressData.postal_area_2 ? addressData.postal_area_2 : null,
    Country: addressData.country,
  };
  const options = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(CREATE_ADDRESS),
  };
  const response = yield call(request, requestURL, options);
  if (response.success) {
    yield put(setRootGlobalLoader(false));
    yield put(setAddressModalVisibility(false));
    yield put(getConexionDetails());
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

function* deleteAddressAPI({ addressId }) {
  yield put(setRootGlobalLoader(true));
  const accessToken = yield select(selectToken());
  const requestURL = `${
    config.apiURL
  }DeleteConexionAddress?conexionAddressId=${addressId}`;
  const options = {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  const response = yield call(request, requestURL, options);
  if (response.success) {
    yield put(setRootGlobalLoader(false));
    yield put(getConexionDetails());
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

function* createIndividualDetails() {
  yield put(setRootGlobalLoader(true));
  const accessToken = yield select(selectToken());
  const newIndividual = yield select(selectIndividualDetails());
  console.log('#%%^$#%$%%%%%%%%%%%%%%%%%%', newIndividual);
  const requestURL = `${config.apiURL}CreateIndividualConexion`;
  const createIndividual = {
    Name: newIndividual.first_name,
    title: newIndividual.title,
    SharingType: newIndividual.shared_type,
    ShortName: newIndividual.initial,
    LastName: newIndividual.last_name,
    JobTitle: newIndividual.job_title,
    Organization: newIndividual.select_organisation,
    Mobile1TelephoneNumber: newIndividual.primary_mobile,
    BusinessEmailAddress: newIndividual.business_email,
    BusinessTelephoneNumber: newIndividual.business_phone,
  };
  const options = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(createIndividual),
  };
  const response = yield call(request, requestURL, options);
  if (response.success) {
    yield put(setRootGlobalLoader(false));
    yield put(setIndividualModalVisibility(false));
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
  yield takeLatest(GET_LIST_OF_ORG, getOrganizationConexionAPI);
  yield takeLatest(GET_IND_CONEXIONS, getIndividualConexionAPI);
  yield takeLatest(GET_CONEXION_NOTES, getConexionNotesAPI);
  yield takeLatest(GET_CONEXION_DETAILS, getConexionDetailsAPI);
  yield takeLatest(FETCH_DD_METADATA, getConexionMetaDataAPI);
  yield takeLatest(DELETE_ADDRESS, deleteAddressAPI);
  yield takeLatest(CREATE_CONEXION_ADDRESS, createConexionAddressAPI);
  //--
  yield takeLatest(CREATE_INDIVIDUAL, createIndividualDetails);
}
