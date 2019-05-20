import { reducer as formReducer } from 'redux-form';
import conexionReducer from './reducer';
import conexionSaga from './saga';

export function getConexionModule() {
  return {
    // Unique id of the module
    id: 'conexionStore',
    // Maps the Store key to the reducer
    reducerMap: {
      conexionStore: conexionReducer,
      form: formReducer,
    },
    // This module uses redux-saga middleware
    // This property will be be used by the SagaExtension
    // to run sagas for the moduleD
    sagas: [conexionSaga],
  };
}
