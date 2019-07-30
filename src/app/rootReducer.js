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
    'NLevbKFLygjHAhaL8e62-Upu966xRnmZmMk0qxpntWGorGWdgL81YQhab5wyUK3gl8_eDByUiQDpFwMH7L5q5TQsEvtNG86nXxzmt0YbSuOsAef1XT0sIeJHWceBUuva5n7ZYryOeTWfmimg-67ZYoxc8CCiJaqHkz9So6bfWByQiqz_Z89-HGPCWqeMqgrZu81sR-jOq4D018yMu5eqhoFeokv3JXO2UQcpq_MSovHHTbCIO33rsjDOiaQPQ8a6Nu_Qo16iU9gHIUlYpxNd6DEYFSMEcLPFMVy5sdzj91fwLJqECr4mqD61foZZdXEQixuqSrz8IJfB9ZKAL5FTUHYzS_DdieHwQ_dNhagYGJSTb2gT9jl6aJ4UdNGX_EKzIRYHmpcGkU6cgkMfdMmgF-iiG0fS9GmNT1O7frgigWOObwk7KjWOXSsSUs5Un1ZeGGuJHMj6UQqYpX9rXV2WvcjzkeTK3VuLGHTPjWQYFY_Hiv7iR4dUUqinx-5bznXmbKoyIg',
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
