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
  getOrgConexions,
  setEditCNXModalVisibilty,
  // dispatchOrganisationDetails,
  getOrganisationDetails,
  getConexionsNotesAction,
  saveConexionTimelineAction,
  getConexionTimelineAction,
} from './actions';
import {
  GET_IND_CONEXIONS,
  GET_LIST_OF_ORG,
  GET_CONEXION_NOTES,
  GET_CONEXION_TIMELINE,
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
  EDIT_ORG_CONEXION,
  GET_ORGANISATION_DETAILS,
  CREATE_CONEXION_NOTE,
  EDIT_CONEXION_NOTE,
  DELETE_CONEXION_NOTE,
} from './constants';
import {
  selectToken,
  selectConexionId,
  selectCreateAddressData,
  selectIndividualDetails,
  selectOrganisationDetails,
  selectCreateConexionNoteData,
  selectConexionNoteFilter,
  selectConexionTimelineFilter,
} from './selectors';
import {
  individualConexionPayloadMapper,
  organisationPayloadMappers,
} from './mappers';
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

function* getConexionNotesAPI() {
  yield put(setRootGlobalLoader(true));
  const accessToken = yield select(selectToken());
  const conexionId = yield select(selectConexionId());
  const payLoad = yield select(selectConexionNoteFilter());
  payLoad.ConexionId = conexionId;
  const requestURL = `${config.apiURL}ConexionNotes`;
  const options = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payLoad),
  };
  const response = yield call(request, requestURL, options);
  if (response.success) {
    yield put(setRootGlobalLoader(false));
    yield put(saveConexionNotesAction(response.data));
    yield put(getConexionTimelineAction());
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

function* getConexionTimelineAPI() {
  yield put(setRootGlobalLoader(true));
  const accessToken = yield select(selectToken());
  const conexionId = yield select(selectConexionId());
  const payLoad = yield select(selectConexionTimelineFilter());
  payLoad.ConexionId = conexionId;
  const requestURL = `${config.apiURL}ConexionTimeline`;
  const options = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payLoad),
  };
  const response = yield call(request, requestURL, options);

  if (response.success) {
    yield put(setRootGlobalLoader(false));
    yield put(saveConexionTimelineAction(response.data));
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
function* getOrganisationDetailsAPI() {
  yield put(setRootGlobalLoader(true));
  const accessToken = yield select(selectToken());
  const conexionId = yield select(selectConexionId());
  const requestURL = `${
    config.apiURL
  }OrganizationConexionDetail?Conexionid=${conexionId}`;
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
    yield put(getOrgConexions());
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
function* editOrganisationDetailsAPI() {
  yield put(setRootGlobalLoader(true));
  const accessToken = yield select(selectToken());
  const newOrganisation = yield select(selectOrganisationDetails());
  const conexionId = yield select(selectConexionId());
  const requestURL = `${config.apiURL}EditOrganizationConexion`;
  const organisationPayload = organisationPayloadMappers(newOrganisation);
  organisationPayload.ConexionId = conexionId;
  const options = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(organisationPayload),
  };
  const response = yield call(request, requestURL, options);

  if (response.success) {
    yield put(setRootGlobalLoader(false));
    yield put(setEditCNXModalVisibilty(false));
    yield put(getOrganisationDetails());
    yield put(getOrgConexions());
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

function* createNotesAPI() {
  yield put(setRootGlobalLoader(true));
  const accessToken = yield select(selectToken());
  const conexionId = yield select(selectConexionId());
  const notesData = yield select(selectCreateConexionNoteData());
  const requestURL = `${config.apiURL}NewConexionNote`;
  notesData.ConexionId = conexionId;

  const options = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(notesData),
  };
  const response = yield call(request, requestURL, options);

  if (response.success) {
    yield put(setRootGlobalLoader(false));
    yield put(getConexionsNotesAction());
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

function* editConexionNotesAPI() {
  yield put(setRootGlobalLoader(true));
  const accessToken = yield select(selectToken());
  const notesData = yield select(selectCreateConexionNoteData());
  const requestURL = `${config.apiURL}EditConexionNote`;

  const options = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(notesData),
  };
  const response = yield call(request, requestURL, options);

  if (response.success) {
    yield put(setRootGlobalLoader(false));
    yield put(getConexionsNotesAction());
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

function* deleteConexionNotesAPI({ noteId }) {
  yield put(setRootGlobalLoader(true));
  const accessToken = yield select(selectToken());
  const requestURL = `${
    config.apiURL
  }DeleteConexionNote?conexionNoteId=${noteId}`;

  const options = {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  };
  const response = yield call(request, requestURL, options);

  if (response.success) {
    yield put(setRootGlobalLoader(false));
    yield put(getConexionsNotesAction());
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
  yield takeLatest(GET_CONEXION_TIMELINE, getConexionTimelineAPI);
  yield takeLatest(GET_CONEXION_DETAILS, getConexionDetailsAPI);
  yield takeLatest(FETCH_DD_METADATA, getConexionMetaDataAPI);
  yield takeLatest(DELETE_ADDRESS, deleteAddressAPI);
  yield takeLatest(CREATE_CONEXION_ADDRESS, createConexionAddressAPI);
  yield takeLatest(EDIT_CONEXION_ADDRESS, editConexionAddressAPI);
  yield takeLatest(GET_USER_DD_VALUE, getUserDDValuesAPI);
  yield takeLatest(GET_ORG_DD_VALUE, getOrgDDValuesAPI);
  yield takeLatest(CREATE_INDIVIDUAL, createIndividualDetailsAPI);
  yield takeLatest(CREATE_ORGANISATION, createOragnisationDetailsAPI);
  yield takeLatest(GET_ORGANISATION_DETAILS, getOrganisationDetailsAPI);
  yield takeLatest(EDIT_IND_CONEXION, editIndividualDetailsAPI);
  yield takeLatest(EDIT_ORG_CONEXION, editOrganisationDetailsAPI);
  yield takeLatest(CREATE_CONEXION_NOTE, createNotesAPI);
  yield takeLatest(EDIT_CONEXION_NOTE, editConexionNotesAPI);
  yield takeLatest(DELETE_CONEXION_NOTE, deleteConexionNotesAPI);
}
