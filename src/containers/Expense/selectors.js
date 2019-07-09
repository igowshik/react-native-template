import { createSelector } from 'reselect';

// Absolute imports
import { rootInitialState } from 'cnxapp/src/app/rootReducer';

// Relative imports
import { IntialState } from './reducer';

const rootReducers = state =>
  state.rootStore ? state.rootStore : rootInitialState;

const expenseReducers = state =>
  state.expenseRootStore ? state.expenseRootStore : IntialState;

// Root state selectors
const selectToken = () =>
  createSelector(
    rootReducers,
    dataState => dataState.accessToken,
  );

const selectGlobalLoader = () =>
  createSelector(
    rootReducers,
    dataState => dataState.globalLoader,
  );

const selectToastVisibility = () =>
  createSelector(
    rootReducers,
    dataState => dataState.toastVisible,
  );

const selectToastData = () =>
  createSelector(
    rootReducers,
    dataState => dataState.toast,
  );

const selectExpenseId = () =>
  createSelector(
    expenseReducers,
    dataState => dataState.selectedConexion,
  );

export {
  selectToken,
  selectGlobalLoader,
  selectToastVisibility,
  selectToastData,
  selectExpenseId,
};
