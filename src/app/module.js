import rootReducer from './rootReducer';

export function getRootModule() {
  return {
    // Unique id of the module
    id: 'rootStore-cf9c92f4-5ccd-404b-ae68-7c632c3ec64e',
    // Maps the Store key to the reducer
    reducerMap: {
      rootStore: rootReducer,
    },
    // This module uses redux-saga middleware
    // This property will be be used by the SagaExtension
    // to run sagas for the moduleD
  };
}
