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
  setIndividualModalVisibility,
  saveUswerDDList,
  saveOrgDDList,
  getIndConexions,
  setEditCNXModalVisibilty,
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
  EDIT_CONEXION_ADDRESS,
  GET_USER_DD_VALUE,
  GET_ORG_DD_VALUE,
  CREATE_ORGANISATION,
  EDIT_IND_CONEXION,
} from './constants';
import {
  selectToken,
  selectConexionId,
  selectCreateAddressData,
  selectIndividualDetails,
  selectOrganisationDetails,
} from './selectors';
import { individualConexionPayloadMapper } from '../../utils/mappers/ConexionMappers';
import { organisationPayloadMappers } from '../../utils/mappers/OrganisationMappers';

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
  const response = yield call(request, requestURL, options);
  if (response.success) {
    yield put(setRootGlobalLoader(false));
    yield put(saveConexionNotesAction(response.data));
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

function* editConexionAddressAPI() {
  yield put(setRootGlobalLoader(true));
  const accessToken = yield select(selectToken());
  const addressData = yield select(selectCreateAddressData());
  const requestURL = `${config.apiURL}EditConexionAddress`;
  const CREATE_ADDRESS = {
    ConexionAddressId: addressData.addressId,
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

function* getUserDDValuesAPI() {
  yield put(setRootGlobalLoader(true));
  const accessToken = yield select(selectToken());
  const requestURL = `${config.apiURL}UserDropdownValues`;
  const ddList = [];
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  const response = yield call(request, requestURL, options);
  if (response.success) {
    yield put(setRootGlobalLoader(false));
    response.data.forEach(dd => {
      ddList.push({
        key: dd.value.toString(),
        value: dd.value,
        label: dd.label,
      });
    });
    yield put(saveUswerDDList(ddList));
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

function* getOrgDDValuesAPI() {
  yield put(setRootGlobalLoader(true));
  const accessToken = yield select(selectToken());
  const requestURL = `${config.apiURL}OrganizationConexionDropdown`;
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  const response = yield call(request, requestURL, options);
  if (response.success) {
    yield put(setRootGlobalLoader(false));
    yield put(saveOrgDDList(response.data));
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

function* createIndividualDetailsAPI() {
  yield put(setRootGlobalLoader(true));
  const accessToken = yield select(selectToken());
  const newIndividual = yield select(selectIndividualDetails());
  const requestURL = `${config.apiURL}CreateIndividualConexion`;
  const individualConexionPayload = individualConexionPayloadMapper(
    newIndividual,
  );
  const options = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(individualConexionPayload),
  };
  const response = yield call(request, requestURL, options);

  if (response.success) {
    yield put(setRootGlobalLoader(false));
    yield put(setIndividualModalVisibility(false));
    yield put(getIndConexions());
  } else {
    yield put(setIndividualModalVisibility(false));
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
function* createOragnisationDetailsAPI() {
  yield put(setRootGlobalLoader(true));
  const accessToken = yield select(selectToken());
  const newOrganisation = yield select(selectOrganisationDetails());

  const requestURL = `${config.apiURL}CreateOrganizationConexion`;
  const organisatoinPayload = organisationPayloadMappers(newOrganisation);
  const options = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(organisatoinPayload),
  };
  const response = yield call(request, requestURL, options);

  if (response.success) {
    yield put(setRootGlobalLoader(false));
    yield put(setIndividualModalVisibility(false));
    yield put(getIndConexions());
  } else if (response.status === 422) {
    yield put(setEditCNXModalVisibilty(false));
    yield put(
      setToastMessage({
        toastMessage: response.response.Messages
          ? `Message from server: ${response.response.Messages[0].ErrorMessage}`
          : GENERAL_ERROR,
        toastType: ERROR,
      }),
    );
    yield put(setRootGlobalLoader(false));
    yield put(setToastVisibility(true));
  } else {
    yield put(setIndividualModalVisibility(false));
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

function* editIndividualDetailsAPI() {
  yield put(setRootGlobalLoader(true));
  const accessToken = yield select(selectToken());
  const newIndividual = yield select(selectIndividualDetails());
  const conexionId = yield select(selectConexionId());
  const requestURL = `${config.apiURL}EditIndividualConexion`;
  const individualConexionPayload = individualConexionPayloadMapper(
    newIndividual,
  );
  individualConexionPayload.ConexionId = conexionId;
  const options = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(individualConexionPayload),
  };
  const response = yield call(request, requestURL, options);
  if (response.success) {
    yield put(setRootGlobalLoader(false));
    yield put(setEditCNXModalVisibilty(false));
    yield put(getConexionDetails());
    yield put(getIndConexions());
  } else if (response.status === 422) {
    yield put(setEditCNXModalVisibilty(false));
    yield put(
      setToastMessage({
        toastMessage: response.response.Messages
          ? `Message from server: ${response.response.Messages[0].ErrorMessage}`
          : GENERAL_ERROR,
        toastType: ERROR,
      }),
    );
    yield put(setRootGlobalLoader(false));
    yield put(setToastVisibility(true));
  } else {
    yield put(setEditCNXModalVisibilty(false));
    yield put(
      setToastMessage({
        toastMessage: response.message
          ? `Message from server: ${response.message}`
          : GENERAL_ERROR,
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
  yield takeLatest(EDIT_CONEXION_ADDRESS, editConexionAddressAPI);
  yield takeLatest(GET_USER_DD_VALUE, getUserDDValuesAPI);
  yield takeLatest(GET_ORG_DD_VALUE, getOrgDDValuesAPI);
  yield takeLatest(CREATE_INDIVIDUAL, createIndividualDetailsAPI);
  yield takeLatest(CREATE_ORGANISATION, createOragnisationDetailsAPI);
  yield takeLatest(CREATE_INDIVIDUAL, createIndividualDetailsAPI);
  yield takeLatest(EDIT_IND_CONEXION, editIndividualDetailsAPI);
}
