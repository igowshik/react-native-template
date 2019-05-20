import {
  SET_ACCESS_TOKEN,
  GET_ACCESS_TOKEN,
  SET_LOADER_VALUE,
} from './constants';

export const getAccessToken = (userName, password) => ({
  type: GET_ACCESS_TOKEN,
  userName,
  password,
});

export const setAccessToken = token => ({
  type: SET_ACCESS_TOKEN,
  token,
});

export const setLoaderValue = value => ({
  type: SET_LOADER_VALUE,
  value,
});
