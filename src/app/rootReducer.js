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
    'JE-PspVyktR-oQ1dXqHwrdvpcOXWZUHN31xWjW5fAIA9uzfI1IZuFg2gmyvnfYVD6PgQZztZZuCUYH4U-5wVcfdI-3fy_xLPFnTR8RJjJyngLu_w03hkdAOREsQDna9bPJi5UUV94JdgcSf4HlgL4-1vmPf5FkisBN4j-JjEzF7TBegYHLOzmdGbK1rp5pNR8-DvFCcuIB_SUCeY8x1bDFdp-qFAKHLXP0x3uiMf5ZaMIoqRzyUi5pnGd4P_-HhanJo80d6ndS7fO2hUmylU3Vlb1TLuMJNL66sq1tGCDGtVB1ch3RB08U7e7eFji498unQsk2mWG1yu3tDKj0RbYnguoaI3F0uaDv0uWVhLs9UPn_a3ZYvHiAlcbdlOQ9bf_MGKxDnE5wvILbr77rJe1Sv1-WixACFlYoUC0g2qP-mnxUJBg0nTXPdO6f4PQ-FQR9O-aD0dd46ZKZ7hz6jVxPZ_emsdbiLX0qHEFVQXm7TTIIXRWJy0uSVa47ClsqEU7_FXaHKtiBVGy-aLVIRtc3PvCKqMmPZJtN2PsouzBMOiDaopwIgN0zmXpaKHpipOBFpi3OwBp8FKEb40G2kvhDHHscZRCb8vHQKgsLZjIyrSSYtR8SCuZbhfeAweFd2edG-iTQ',
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
