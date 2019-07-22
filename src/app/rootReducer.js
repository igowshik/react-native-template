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
  accessToken:
    '5RZpt5qrk8YVBjCqDP4XMAZO8PphmKG2L6b99sZO4VkRCfAkIQXsWX5VfvvLcWDuXoDhln9KvnXevl03qFDhsSGzttIXZfDp3O8u7PiDStOthT3qlZhYdfsPXKeuN8YEMp3U2oeas4r6RFRGoJNyooG-chCmPJgHG8dVNccUchey5L_JU5Aw2zWMgB0PvffgIkSrfBAzcEVnfixzOisovZM2QvT8LGYtIsM2YeBc-h6kp-5B03MytjKX2egzeb1yCdUe-rITEXYx2Tofz9KFMuiYd-tYdDErWVknYTlbGo0kJSVi5GIuVRPcqXKcXJSHcBoLZdKozkFt2CDkbkpqTZFatQ9ee2ZJIR_HSjJorlex2DKvahEPGElFdcFtL5QLqe-X8Kk0t2fh8Ta4fzOr_pHDS26mFdBJzsyy5yHRbovb2xjteViS1rFgfS5jN1PhcbZmojI7zWpNG7DWUYZLzDmwrJG2d34mNOD_vErZCpyD0Z8nJydYdse0xHqKkR5ILmFzqw',
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
