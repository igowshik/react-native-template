import { reducer as formReducer } from 'redux-form';

// Expense root
import expenseRootReducer from './reducer';
import expenseRootSaga from './saga';

// Expense Primary screen
import expensePrimaryReducer from './PrimaryScreen/reducer';
import expensePrimarySaga from './PrimaryScreen/saga';

// Expense secondary screen
import expenseSecondaryReducer from './SecondaryScreen/reducer';
import expenseSecondarySaga from './SecondaryScreen/saga';

export function getExpenseModule() {
  return {
    // Unique id of the module
    id: 'expenseStore-726d8771-28fc-44ab-9f1c-327e3cb40202',
    // Maps the Store key to the reducer
    reducerMap: {
      expenseRootStore: expenseRootReducer,
      expensePrimaryScreenStore: expensePrimaryReducer,
      expenseSecondaryScreenStore: expenseSecondaryReducer,
      form: formReducer,
    },
    // This module uses redux-saga middleware
    // This property will be be used by the SagaExtension
    // to run sagas for the module
    sagas: [expenseRootSaga, expensePrimarySaga, expenseSecondarySaga],
  };
}
