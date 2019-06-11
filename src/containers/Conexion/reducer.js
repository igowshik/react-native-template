import produce from 'immer';
import {
  SET_IND_CONEXIONS,
  SET_ORG_CONEXIONS,
  SET_CREATE_CONEXION_DATE,
  SET_CONEXION_NOTES,
  SET_CONEXION_ID,
  SET_CONEXION_DETAILS,
  SAVE_DD_METADATA,
} from './constants';

export const conexionInitialState = {
  individualConexions: [],
  organizationConexions: [],
  createConexion: {
    data: {},
    types: '',
  },
  conexionNotes: [],
  selectedConexion: '',
  conexionDetails: {},
  metaData: {},
};

const conexionStore = (state = conexionInitialState, action) =>
  produce(state, draft => {
    const draftState = draft;
    switch (action.type) {
      case SET_IND_CONEXIONS: {
        draftState.individualConexions = action.indConexions;
        break;
      }
      case SET_ORG_CONEXIONS: {
        draftState.organizationConexions = action.orgConexions;
        break;
      }
      case SET_CREATE_CONEXION_DATE: {
        draftState.createConexion = action.conexionData;
        break;
      }
      case SET_CONEXION_NOTES: {
        draftState.conexionNotes = action.notesData;
        break;
      }
      case SET_CONEXION_ID: {
        draftState.selectedConexion = action.id;
        break;
      }
      case SET_CONEXION_DETAILS: {
        draftState.conexionDetails = action.details;
        break;
      }
      case SAVE_DD_METADATA: {
        draftState.metaData = action.metaData;
        break;
      }
      default: {
        // do nothing
      }
    }
  });

export default conexionStore;
