import { createSelector } from 'reselect';

// Absolute imports
import { rootInitialState } from 'cnxapp/src/app/rootReducer';

// Relative imports
import { expenseIntialState } from './reducer';

const rootReducers = state =>
  state.rootStore ? state.rootStore : rootInitialState;

const expenseReducers = state =>
  state.conexionStore ? state.conexionStore : expenseIntialState;

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

const selectIndConexion = () =>
  createSelector(
    expenseReducers,
    dataState => dataState.individualConexions,
  );

export {
  selectToken,
  selectGlobalLoader,
  selectToastVisibility,
  selectToastData,
  selectIndConexion,
};
