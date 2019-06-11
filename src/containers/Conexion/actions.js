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

export const getConexionsNotesAction = conexionId => ({
  type: GET_CONEXION_NOTES,
  conexionId,
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
