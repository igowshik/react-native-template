import produce from 'immer';
import {
  SET_IND_CONEXIONS,
  SET_ORG_CONEXIONS,
  SET_CREATE_CONEXION_DATE,
  SET_CONEXION_NOTES,
  SET_CONEXION_TIMELINE,
  SET_CONEXION_ID,
  SET_CONEXION_DETAILS,
  SAVE_DD_METADATA,
  SET_SELECTED_CONEXION_TYPE,
  SET_ADDRESS_MODAL,
  SET_CREATE_ADDRESS_DATA,
  SET_INDIVIDUAL_MODAL,
  SET_INDIVIDUAL_DETAILS,
  SAVE_USER_DD_VALUE,
  SAVE_ORG_DD_VALUE,
  SET_ORGANISATION_DETAILS,
  EDIT_CNX_MODAL,
  SAVE_NOTE_DATE,
  SAVE_NOTE_FILTER,
  SAVE_TIMELINE_FILTER,
  SAVE_LOADER_TEXT_VALUE,
} from './constants';

export const conexionInitialState = {
  individualConexions: [],
  organizationConexions: [],
  createConexion: {
    data: {},
    types: '',
  },
  conexionNotes: [],
  conexionTimeline: [],
  selectedConexion: '',
  selectedConexionType: '',
  conexionDetails: {},
  metaData: {},
  addressModal: false,
  createAddressData: {},
  conexionModal: false,
  individualDetails: {},
  organisationDetails: {},
  userDropDown: [],
  orgDropDown: [],
  conexionEditModal: false,
  notesData: {
    ConexionId: '',
    EntityLink: '',
    ConexionTimelineId: '',
    Description: '',
  },
  noteFilter: {
    ConexionId: '',
    StartDate: new Date(),
    EndDate: new Date(),
  },
  timelineData: {
    ConexionId: '',
    Note: '',
    PrivateNote: false,
    Title: '',
  },
  timelineFilter: {
    ConexionId: '',
    StartDate: new Date(),
    EndDate: new Date(),
  },
  loaderValue: {
    title: 'Conexion',
    text: 'Loading...',
  },
};

const conexionStore = (state = conexionInitialState, action) =>
  produce(state, draft => {
    const draftState = draft;
    switch (action.type) {
      case SET_IND_CONEXIONS: {
        if (action.indConexions.data && action.indConexions.data.length > 0) {
          if (action.indConexions.page === 1)
            draftState.individualConexions = action.indConexions.data;
          else {
            const obj = [...state.individualConexions];
            obj.push(...action.indConexions.data);
            draftState.individualConexions = obj;
          }
        }
        break;
      }
      case SET_ORG_CONEXIONS: {
        if (action.orgConexions.data && action.orgConexions.data.length > 0) {
          if (action.orgConexions.page === 1)
            draftState.organizationConexions = action.orgConexions.data;
          else {
            const obj = [...state.organizationConexions];
            obj.push(...action.orgConexions.data);
            draftState.organizationConexions = obj;
          }
        }
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
      case SET_CONEXION_TIMELINE: {
        draftState.conexionTimeline = action.timelineData;
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
      case SET_SELECTED_CONEXION_TYPE: {
        draftState.selectedConexionType = action.ctype;
        break;
      }
      case SET_ADDRESS_MODAL: {
        draftState.addressModal = action.addressModal;
        break;
      }
      case SET_CREATE_ADDRESS_DATA: {
        draftState.createAddressData = action.addressData;
        break;
      }
      case SET_INDIVIDUAL_MODAL: {
        draftState.conexionModal = action.individualVisibility;
        break;
      }
      case SET_INDIVIDUAL_DETAILS: {
        draftState.individualDetails = action.individualDetails;
        break;
      }
      case SAVE_USER_DD_VALUE: {
        draftState.userDropDown = action.userDDValues;
        break;
      }
      case SAVE_ORG_DD_VALUE: {
        draftState.orgDropDown = action.orgDDValues;
        break;
      }
      case SET_ORGANISATION_DETAILS: {
        draftState.organisationDetails = action.orgDetails;
        break;
      }
      case EDIT_CNX_MODAL: {
        draftState.conexionEditModal = action.modalVisibile;
        break;
      }
      case SAVE_NOTE_DATE: {
        draftState.notesData = action.noteData;
        break;
      }
      case SAVE_NOTE_FILTER: {
        draftState.noteFilter = action.noteFilter;
        break;
      }
      case SAVE_TIMELINE_FILTER: {
        draftState.timelineFilter = action.timelineFilter;
        break;
      }
      case SAVE_LOADER_TEXT_VALUE: {
        draftState.loaderValue = action.loaderObj;
        break;
      }
      default: {
        // do nothing
      }
    }
  });

export default conexionStore;
