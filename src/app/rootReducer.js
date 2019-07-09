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
    'xPcFjBuFlWPiTm2ey7bFzKYwo7yJaz1ksw_JXz-iTfHVaGJBx4M5bccnRY35G1u7WoZOKV_p09LnuWEsmEG_TYvtLvHtLMb6cHyKIMKPjjw8P6-cX1j6rEIP6QnNhoLSlQ2mhS8e705DMMV4XVkqz4_TfrA3LWZlMaFA1juj-XBSkZlP1RgK7DNdU6vFZZvSxd0yxSScV8xgcLNir6ky4yNCP5_ya30F87WwUzv7FFeYUCl8_slF3TAel_yApBPw1YJhp8dkC1HyBW9nDegjcU4InhyMQjUjsded-QQWIORKP8Mi9zWdZXVb00HDXj8LR4HCRb4t1b9mNj3_5I8rGy6QVImkgXPgCh5CMYwNJSGbJlQfrwaORBS9DsX9-w46_RK9BEqWcwAuq7Jkdthcww3L_v4lj0CCwrs_FciPM95qiGX_ImN6nWz1yFb0xwlFbIyQQtEINhvt5j-UsML123jhhgCNHO-VfNwVBOPXcii9HKGQ',
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
