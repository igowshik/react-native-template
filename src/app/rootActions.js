import {
  SET_TOAST_MESSAGE,
  SET_GLOBAL_LOADER,
  SET_ROOT_ACCESS_TOKEN,
  SET_TOAST_VISIBLE,
} from './rootConstants';

export const setToastMessage = toast => ({
  type: SET_TOAST_MESSAGE,
  toast,
});

export const setRootGlobalLoader = loader => ({
  type: SET_GLOBAL_LOADER,
  loader,
});

export const setRootAccessToken = token => ({
  type: SET_ROOT_ACCESS_TOKEN,
  token,
});

export const setToastVisibility = visible => ({
  type: SET_TOAST_VISIBLE,
  visible,
});
