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
    'riVPZEpyN82lbBOPgHLIcgiETI_9E_0x8qMli1QfGPmSrT7UfkkP_qcOmzPsBpxfIz5XDXqZWyUOqIuATLFeVnAWVe89kxvXPdVmc0FyZWWgRP3igKOZ44hvGfBzMfkwL0IoYuR8SjA7CObfS_A0PVSWfS001w-qunnbpFZjImaO8cDvi41ImXvL3T9lTfVGoIUp4ZSNW63p83IN8FKIgXYALl4lBCGQj-paHVfhB2YQKiM4_G9pFcVDzJAN_eXdgOIwlkS_2oTtuoliPymgm7W8fHOGkxRwWIA5fkNyYIN_0FDRGNDisYVAfMqhrafh4qDbAecehlc52M6B8-9vlIBnAwqbA8Fs5D0zBtwAXFKoLACpjeCUgNNmVbW42EMhOLdnGvtPzPl7WLQENwCijO5rVLYJ2yYlkT43PYGpPsmEml0yZm0pvGS1Vi4Gyv0IPZUqi1_V5i5ZmPDufX9BmusnTcOjlbfcyhKo6a7tYFxb2SOsUUhlgjy3xYpjb4h-RI6JWf40nBwH7Xu3uQzPKlD9-ASL-8EEx9n8jJe_6h6zoVaCZ8y4WRebf2AatOakrLmjlkJu6aMwrUOY43Nb40UzeXD4jHEuCpNaid8s2_5qetw3EnwEO57iZjrgf6ok1RiJoRz6BbPv_JQSvtBWGKpybmD3eY-lS2CA41VN9L5laS2dMNNNio3IQL9k2scPtvlJCFAGrpmRq0oV5sw59JRkGvGo4nBIM8ylrdOJnnJH6q7Z2iAQAnAPX3KWKgTHfGzmxFTziVouywhDn1011dExf7Rh2KCfbs8IWr-Rrne8aSEqMikjQMwzX1f3P88E1zfeaTOpqA2qmRS8pIESY0sOVeCfuLZ7-PE3Asl-iaBWEFKVcWsH2rdcK8m_jl98woYV6QiJgwESE_tmiyj0CQIbPi4ey3K0rzfwwmFQ4Vq78WRNcM1UFkPPDK27-w3RBz1cyg',
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
