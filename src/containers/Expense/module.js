import { reducer as formReducer } from 'redux-form';
import expenseReducer from './reducer';
import expenseSaga from './saga';

export function getExpenseModule() {
  return {
    // Unique id of the module
    id: 'expenseStore',
    // Maps the Store key to the reducer
    reducerMap: {
      expenseStore: expenseReducer,
      form: formReducer,
    },
    // This module uses redux-saga middleware
    // This property will be be used by the SagaExtension
    // to run sagas for the moduleD
    sagas: [expenseSaga],
  };
}
