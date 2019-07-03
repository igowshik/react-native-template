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
    '7CyuXUdhXzkUrzt0e6Erm8nUGfIQ4FqNTpFdk3hFm1PkMDDvlnIEVZ31_L-p32Cvvf5waf7KxJs3_FBoGH6f7LWhyGQZoa5j_8MC0a9s6-n4d-0aBzPy55advWuz0v_I_o7gN1A8jOCkMmjxap6Afc9kyeFxYwA64I1lMulHKbdAqx_y-7eFtvAhl7mDFAegy3_pP4uEuY_V6y6ZthRncgVIcK1EC5GOPklyCO5z8DEHLfuhzFoMnXndwJwCxmFzc7j4k264D5PrLsQsOrdx2Fcqqq3b368QWGbbD5eYr2FeHXSbRfa5v9TW7q6niyKPj6EtLh23jDgy4b0MNvih8-kpPJvFwWflbq1Sm1U1jkejsEnFJCi4HDf_OQSvTrBGzpYICVri7CyqlwJ_Sa1VuMQ8QW3e_HzkVsjz5wv-x6DnEmoTn7wDmfRnVpELNNb8iwTENw04F-KK3nSfdgt4c6jLuuFtrIOqnQE_t-uj8a1TKuklzMiFcs5AxEGeVhn9iCbRqQ',
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
