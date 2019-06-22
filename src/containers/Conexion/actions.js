import {
  SET_IND_CONEXIONS,
  SET_ORG_CONEXIONS,
  GET_IND_CONEXIONS,
  GET_LIST_OF_ORG,
  SET_CREATE_CONEXION_DATE,
  SET_CONEXION_NOTES,
  GET_CONEXION_NOTES,
  SET_CONEXION_ID,
  SET_CONEXION_DETAILS,
  GET_CONEXION_DETAILS,
  FETCH_DD_METADATA,
  SAVE_DD_METADATA,
  DELETE_ADDRESS,
  SET_SELECTED_CONEXION_TYPE,
  SET_ADDRESS_MODAL,
  SET_CREATE_ADDRESS_DATA,
  CREATE_CONEXION_ADDRESS,
  SET_INDIVIDUAL_MODAL,
  SET_INDIVIDUAL_DETAILS,
  CREATE_INDIVIDUAL,
  EDIT_CONEXION_ADDRESS,
  GET_USER_DD_VALUE,
  SAVE_USER_DD_VALUE,
  GET_ORG_DD_VALUE,
  SAVE_ORG_DD_VALUE,
  SET_ORGANISATION_DETAILS,
  CREATE_ORGANISATION,
  EDIT_IND_CONEXION,
  EDIT_CNX_MODAL,
  SAVE_NOTE_DATE,
  CREATE_CONEXION_NOTE,
  EDIT_CONEXION_NOTE,
  DELETE_CONEXION_NOTE,
} from './constants';

export function getIndConexions() {
  return { type: GET_IND_CONEXIONS };
}

export const saveIndConexions = indConexions => ({
  type: SET_IND_CONEXIONS,
  indConexions,
});

export const getOrgConexions = () => ({
  type: GET_LIST_OF_ORG,
});

export const saveOrgConexions = orgConexions => ({
  type: SET_ORG_CONEXIONS,
  orgConexions,
});

export const setConexionDataAction = conexionData => ({
  type: SET_CREATE_CONEXION_DATE,
  conexionData,
});

export const getConexionsNotesAction = () => ({
  type: GET_CONEXION_NOTES,
});

export const saveConexionNotesAction = notesData => ({
  type: SET_CONEXION_NOTES,
  notesData,
});

export const saveselectedConexionId = id => ({
  type: SET_CONEXION_ID,
  id,
});

export const getConexionDetails = () => ({
  type: GET_CONEXION_DETAILS,
});

export const saveConexionDetails = details => ({
  type: SET_CONEXION_DETAILS,
  details,
});

export const getMetaData = () => ({
  type: FETCH_DD_METADATA,
});

export const saveMetaData = metaData => ({
  type: SAVE_DD_METADATA,
  metaData,
});

export const setSelectedConexionType = ctype => ({
  type: SET_SELECTED_CONEXION_TYPE,
  ctype,
});

export const deleteAddress = addressId => ({
  type: DELETE_ADDRESS,
  addressId,
});

export const setAddressModalVisibility = addressModal => ({
  type: SET_ADDRESS_MODAL,
  addressModal,
});

export const setCreateAddressData = addressData => ({
  type: SET_CREATE_ADDRESS_DATA,
  addressData,
});

export const createConexionAddress = () => ({
  type: CREATE_CONEXION_ADDRESS,
});

export const setIndividualModalVisibility = individualVisibility => ({
  type: SET_INDIVIDUAL_MODAL,
  individualVisibility,
});
export const dispatchIndividualDetails = individualDetails => ({
  type: SET_INDIVIDUAL_DETAILS,
  individualDetails,
});
export const dispatchCreateIndividual = () => ({
  type: CREATE_INDIVIDUAL,
});

export const editConexionAddress = () => ({
  type: EDIT_CONEXION_ADDRESS,
});

export const getUserDDList = () => ({
  type: GET_USER_DD_VALUE,
});

export const saveUswerDDList = userDDValues => ({
  type: SAVE_USER_DD_VALUE,
  userDDValues,
});

export const getOrgDDList = () => ({
  type: GET_ORG_DD_VALUE,
});

export const saveOrgDDList = orgDDValues => ({
  type: SAVE_ORG_DD_VALUE,
  orgDDValues,
});

export const dispatchOrganisationDetails = orgDetails => ({
  type: SET_ORGANISATION_DETAILS,
  orgDetails,
});

export const dispatchCreateOrganisation = () => ({
  type: CREATE_ORGANISATION,
});

export const editIndividualConexion = () => ({
  type: EDIT_IND_CONEXION,
});

export const setEditCNXModalVisibilty = modalVisibile => ({
  type: EDIT_CNX_MODAL,
  modalVisibile,
});

export const setNoteData = noteData => ({
  type: SAVE_NOTE_DATE,
  noteData,
});

export const createConexionNote = () => ({
  type: CREATE_CONEXION_NOTE,
});

export const editConexionNote = () => ({
  type: EDIT_CONEXION_NOTE,
});

export const deleteConexionNote = noteId => ({
  type: DELETE_CONEXION_NOTE,
  noteId,
});
