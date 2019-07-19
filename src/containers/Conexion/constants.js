// Actions constants
export const SET_IND_CONEXIONS = '@Conexion/SET_IND_CONEXIONS';
export const GET_IND_CONEXIONS = '@Conexion/GET_IND_CONEXIONS';
export const SET_ORG_CONEXIONS = '@Conexion/SET_ORG_CONEXIONS';
export const GET_LIST_OF_ORG = '@Conexion/GET_LIST_OF_ORG';
export const SET_GLOBALE_ERROR = '@Conexion/SET_GLOBALE_ERROR';
export const SET_GLOBALE_LOADER = '@Conexion/SET_GLOBALE_LOADER';
export const SET_CREATE_CONEXION_DATE = '@Conexion/SET_CREATE_CONEXION_DATE';
export const SET_CONEXION_NOTES = '@Conexion/SET_CONEXION_NOTES';
export const GET_CONEXION_NOTES = '@Conexion/GET_CONEXION_NOTES';
export const SET_CONEXION_TIMELINE = '@Conexion/SET_CONEXION_TIMELINE';
export const GET_CONEXION_TIMELINE = '@Conexion/GET_CONEXION_TIMELINE';
export const SET_CONEXION_ID = '@Conexion/SET_CONEXION_ID';
export const GET_CONEXION_DETAILS = '@Conexion/GET_CONEXION_DETAILS';
export const SET_CONEXION_DETAILS = '@Conexion/SET_CONEXION_DETAILS';
export const FETCH_DD_METADATA = '@Conexion/FETCH_DD_METADATA';
export const SAVE_DD_METADATA = '@Conexion/SAVE_DD_METADATA';
export const DELETE_ADDRESS = '@Conexion/DELETE_ADDRESS';
export const SET_SELECTED_CONEXION_TYPE =
  '@Conexion/SET_SELECTED_CONEXION_TYPE';
export const SET_ADDRESS_MODAL = '@Conexion/SET_ADDRESS_MODAL';
export const SET_CREATE_ADDRESS_DATA = '@Conexion/SET_CREATE_ADDRESS_DATA';
export const CREATE_CONEXION_ADDRESS = '@Conexion/CREATE_CONEXION_ADDRESS';
export const SET_INDIVIDUAL_MODAL = '@Conexion/SET_INDIVIDUAL_MODAL';
export const SET_INDIVIDUAL_DETAILS = '@Conexion/SET_INDIVIDUAL_DETAILS';
export const CREATE_INDIVIDUAL = '@Conexion/CREATE_INDIVIDUAL';
export const EDIT_CONEXION_ADDRESS = '@Conexion/EDIT_CONEXION_ADDRESS';
export const GET_USER_DD_VALUE = '@Conexion/GET_USER_DD_VALUE';
export const SAVE_USER_DD_VALUE = '@Conexion/SAVE_USER_DD_VALUE';
export const GET_ORG_DD_VALUE = '@Conexion/GET_ORG_DD_VALUE';
export const SAVE_ORG_DD_VALUE = '@Conexion/SAVE_ORG_DD_VALUE';
export const SET_ORGANISATION_DETAILS = '@Conexion/SET_ORGANISATION_DETAILS';
export const CREATE_ORGANISATION = '@Conexion/CREATE_ORGANISATION';
export const EDIT_IND_CONEXION = '@Conexion/EDIT_IND_CONEXION';
export const EDIT_CNX_MODAL = '@Conexion/EDIT_CNX_MODAL';
export const GET_ORGANISATION_DETAILS = '@Conexion/GET_ORGANISATION_DETAILS';
export const EDIT_ORG_CONEXION = '@Conexion/EDIT_ORG_CONEXION';
export const SAVE_NOTE_DATE = '@Conexion/SAVE_NOTE_DATE';
export const CREATE_CONEXION_NOTE = '@Conexion/CREATE_CONEXION_NOTE';
export const EDIT_CONEXION_NOTE = '@Conexion/EDIT_CONEXION_NOTE';
export const DELETE_CONEXION_NOTE = '@Conexion/DELETE_CONEXION_NOTE';
export const SAVE_NOTE_FILTER = '@Conexion/SAVE_NOTE_FILTER';
export const SAVE_TIMELINE_FILTER = '@Conexion/SAVE_TIMELINE_FILTER';
export const SAVE_LOADER_TEXT_VALUE = '@Conexion/SAVE_LOADER_TEXT_VALUE';

// Local component constants
export const INDIVIDUAL = 'Individual';
export const ORGANIZATION = 'Organization';
export const ALL = 'All';

export const conexionSelectListItems = [
  { label: 'Individual', value: INDIVIDUAL, key: 'key1' },
  { label: 'Organization', value: ORGANIZATION, key: 'key2' },
];

export const GENERAL_ERROR = 'Message from server: Something just went wrong!';

export const CREATOR = 'CTOR';
export const SHARED = 'SHAR';
export const MANGER = 'MGR';

export const METADATA_VARIABLES = 'title,suffix,address_type,country_list';

export const shareTypes = [
  { value: 'PUBL', label: 'Public', key: 0 },
  { value: 'PRIV', label: 'Private', key: 1 },
  { value: 'SHAR', label: 'Shared', key: 3 },
];

export const shareTypeObj = {
  PRIVATE: 'PRIV',
  PUBLIC: 'PUBL',
  SHARED: 'SHAR',
};

export const DELETE_ADDRESS_MESSAGE = 'Are you sure on deleting this address?';
export const DELETE_NOTE_MESSAGE = 'Are you sure on deleting this note?';

export const PROFILE = 'Profile';
export const NOTES = 'Notes';
export const TIMELINE = 'Timeline';
