import {
  SET_TOAST_MESSAGE,
  SET_GLOBAL_LOADER,
  SET_ROOT_ACCESS_TOKEN,
} from './rootConstants';

export const setToastMessage = message => ({
  type: SET_TOAST_MESSAGE,
  message,
});

export const setRootGlobalLoader = loader => ({
  type: SET_GLOBAL_LOADER,
  loader,
});

export const setRootAccessToken = token => ({
  type: SET_ROOT_ACCESS_TOKEN,
  token,
});
