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
export const EDIT_CONEXION_ADDRESS = '@Conexion/EDIT_CONEXION_ADDRESS';
export const GET_USER_DD_VALUE = '@Conexion/GET_USER_DD_VALUE';
export const SAVE_USER_DD_VALUE = '@Conexion/SAVE_USER_DD_VALUE';

// Local component constants
export const INDIVIDUAL = 'Individual';
export const ORGANIZATION = 'Organization';
export const ALL = 'All';

export const conexionSelectListItems = [
  { label: 'Individual', value: INDIVIDUAL, key: 'key1' },
  { label: 'Organization', value: ORGANIZATION, key: 'key2' },
];

export const GENERAL_ERROR = 'Something just went wrong!';

export const CREATOR = 'CTOR';
export const SHARED = 'SHAR';
export const MANGER = 'MGR';

export const METADATA_VARIABLES = 'title,suffix,address_type,country_list';

export const shareTypes = [
  { value: 'Public', label: 'Public', key: 0 },
  { value: 'Private', label: 'Private', key: 1 },
  { value: 'Shared', label: 'Shared', key: 3 },
];

export const shareTypeObj = {
  PRIVATE: 'Private',
  PUBLIC: 'Public',
  SHARED: 'Shared',
};

export const DELETE_ADDRESS_MESSAGE = 'Are you sure on deleting this address?';
