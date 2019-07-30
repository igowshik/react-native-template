import produce from 'immer';
import {
  SET_TOAST_MESSAGE,
  SET_GLOBAL_LOADER,
  SET_ROOT_ACCESS_TOKEN,
  SET_TOAST_VISIBLE,
} from './rootConstants';

import { INFO } from '../utils/constants';

export const rootInitialState = {
  toast: {
    toastMessage: '',
    toastType: INFO,
  },
  accessToken: '',
  globalLoader: false,
  toastVisible: false,
};

const rootReducer = (state = rootInitialState, action) =>
  produce(state, draft => {
    const draftState = draft;
    switch (action.type) {
      case SET_TOAST_MESSAGE: {
        draftState.toast = action.toast;
        break;
      }
      case SET_GLOBAL_LOADER: {
        draftState.globalLoader = action.loader;
        break;
      }
      case SET_ROOT_ACCESS_TOKEN: {
        draftState.accessToken = action.token;
        break;
      }
      case SET_TOAST_VISIBLE: {
        draftState.toastVisible = action.visible;
        break;
      }
      default: {
        // do nothing
      }
    }
  });

export default rootReducer;
