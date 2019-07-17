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
    'wYaq9j_aLXimMsckW0cylw_6AQdr37f7FSj_c8yWYlWykWGqwfn7k8pYWEwmzg9fKOVKgry74jb-N3S8CSRDxDjThRtQxoWXuW9iG6W_qlbAZ56iE4QL2lo6AtZbKBuGF_H_BZVzF9lF3vnN81alXlsQwBto0YWrY2Dpw0Wa0gROZ0fvAYl6vF5HjMXTXd2vYltKcOIUVltR8vbkaoOqP4lHYdlKXAntL8Y-s6vjB-9GRjfyap6_HPQzahdWqWM8zGK67lFRZeOqZfOIrPW2ys-5NXgOniPhp2AVc4O8fx0AEM-M1QczRp8UyN6j6irCTLoKYEvfGBob-5spXSts_06xyzk1qWWmMvJccKO0Xajhgug7LHm-hQENdN-8LvDvttJx2F4PgFEBOxn7ZTtlaFw-HBcTIX2vt1IlLtlYMlvIIl9pxPPMs2F4CWX4GYXlY0teFOknWqKr7FcH31UId89yXMyczDGZ2y6yATDPfz8OjiRgUpdFE7O2bPzQDeK87YKqsw',
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
