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

export const METADATA_VARIABLES = 'title,suffix,addess_type';

export const shareTypes = [
  { value: 'Public', label: 'Public', key: 0 },
  { value: 'Private', label: 'Private', key: 1 },
  { value: 'Shared', label: 'Shared', key: 3 },
];
