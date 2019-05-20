import rootReducer from './rootReducer';

export function getRootModule() {
  return {
    // Unique id of the module
    id: 'rootStore',
    // Maps the Store key to the reducer
    reducerMap: {
      rootStore: rootReducer,
    },
    // This module uses redux-saga middleware
    // This property will be be used by the SagaExtension
    // to run sagas for the moduleD
  };
}
