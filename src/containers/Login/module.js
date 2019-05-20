import loginReducer from './reducer';
import loginSaga from './saga';

export function getLoginModule() {
  return {
    // Unique id of the module
    id: 'loginStore',
    // Maps the Store key to the reducer
    reducerMap: {
      loginStore: loginReducer,
    },
    // This module uses redux-saga middleware
    // This property will be be used by the SagaExtension
    // to run sagas for the moduleD
    sagas: [loginSaga],
  };
}
