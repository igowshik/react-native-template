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
    'Cm6ohP0hRSFMuSn3veH1UcC0oRov7ovH2UHIYESd3PdC1rwGQLzLK89EaDHCKSXzpkYbfa8zKOxMvxl-qziesIhLtU8XEXEsDl0Er4k-xqE28SzxH_DVS7OUHjOotqeLjNYb4xc8Vlh3_dOJngxksElFDGVPAhZxylEquaSrNWNGFmyUO6LZJyRJs8S42aXXmO-sZlyH6lm__N4ceRvcthJTIMnV-mxc8xA0cgo7FeZadlQxU_PxffZGMRMf66cy0xiiP5JBg_3poyN88nHvHxDLGepM6bSgmeAyLO0T5Kh8xeRnWii8RB3tkS6fYbsW5i86zcZeiPDi4B5e0uM6WMKCowZvj0NeiJcBsRSqj_MQ_akcXD8w7BhaglTE9rfDbddL9tZCmvLSkDpYRcQKSqkJISMlmdKDSxuICXS63_KrQawEIIR1JJilYsKFsgYfnuA--r31SO0CHYnGr-hf7BDrkO7W234lI6CgJyIIJSsbLdpRKBzX-h8XAmKLhqqQeHUiqPd4WyHva_081xmNa9uP-O0o7puYyota5erRAwzCsGUgkMiI5ZnLyLWj98mMIDdBCHtKRBfNDa22yhgtRjZV_ZYCZKgyawFcmSDya36zsY4Bn2mMUOuB5dyTCedayvuqHclYN-P6hNFX-hGdkeIlfUjVxQMkI9uBszQSr7KWQ5UJRrzdray7r7sindLIEq4lGgm46BdjqcyBbyptCbaJ4jqpONhpGNgPMqC7r0nysxXI0NqLQ_SoUaRLdJrnpC-fmVy4i2HlIYLy8ts1rqCiuGIAt9-6nOymJBm4hq9YSMf8tIggJ0XFdFIBuQ3ghIlbhekBl1cJMWDp1s30r7gr6rfrPmYziUIa2rSvxEaR8uFRk8Cd7qhtRxAho3fsrEivwtZ4qTmYFe93f_TVNjrKr68ulkDJcb2e3NC77ZnmfGG9',
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
