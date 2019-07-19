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
    'KfY8AC73pnryx7ZRYsgj29OKJdLCl_2GE7sZ1V2yWkw4xmVrUwdxPUcFpNr8py23H4qqzJd2ccYhIrlUFpqUGhpUoFJ69lLqh1cd88Csp_PHQIfvv5BgE-Ktsh7iIq-65bzpcvnz2KfQK6xW5KjMHAn-STdYyu4XkfYC8uIFUcH8rePKsNHtZga9lmMmWGoWAGA4-iIum1zbbqZkcPzbm8YJV2XoVaW9bumUpWvd6r8RoE_UrK_xPfX-YJLVGIEdgAlgFEDgCUAK6gfO58guvjTICoXpw3MvsUF-LGWCV-Sh2Tw9G0qF3nTzXBTafYsZtEEF_cpIUBBwR8u8n5gHIaEQeY6ZaBVor_EHigkwwKCBsBcZowBgS_Lotn6TT-WE8kbn_oBDtOJN2x147NMF3L9lg8WDw_zgehe0OdC2SnSso71tC1IztXrgyZfKnEmYNx82VuBKdqTRp5-cw6JmH2f8szUnRb2Yz5GIZahvQvhPcMBR',
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
