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
    'r1aJ20FABJ9AcwlsxCdQTSssVL_44rdxThW631Azs3Zqh1kTzmdn9UCNuFj0M_euFPefjCHOeavPsuGy9r-7m3JobEvwUrioKinmQm8NMz3rwD6c1c7RBSbMcMSmNus5Xu_glWntmbNmpN2Inas49sXT8W-uqBGoNlaTJdDS2VzH5np9K6YAJSsQaE2tFy9V-U25sGEyQs5hWNaXsMxf1kUw3iOM2-IJXM1rd6hAMR4vHURhphC_DjQr4iXhofJIXR3Q_KcDBSDC3bE87DvrribQpS86TjNLeLcLLcxSU1pPEHTXmVSxHWiXEynmuWdqTuT-hk1KowSiiNygzzfw9aShBKrQBdH73YUu2tTHoXwcrDJ2jViP2bMljGAs9znap099UHOUiWKHV0CGsFICizemqA13gFRjVFd5VYieExg_FYSbTm-fo3QhWCx7wjeu13tvJdwXM-HFxyJ14XWzqILUVZIjqJIZYaPLh1PSJebHybdBreKkkDZrY_-tsAENL2tKPxG81vH3mRPGUt4aylEO81pvCdtwmgDh3tjP8YQ9krttz-8SmXZTzRcOx-J0yoHh4Lwx9pXDibvsn0w-C7FZoI-L4QshSCleHavT6js7h47QN-6Jf4qAQAoNJULNMR6Po_kppmR2y1rVcm-S7kIiTqUlrsQCkCWi_DirWmkfYJXo',
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
