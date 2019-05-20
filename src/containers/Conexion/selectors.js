import { createSelector } from 'reselect';

// Absolute imports
import { rootInitialState } from 'cnxapp/src/app/rootReducer';

// Relative imports
import { conexionInitialState } from './reducer';

const rootReducers = state =>
  state.rootStore ? state.rootStore : rootInitialState;

const conexionReducers = state =>
  state.conexionStore ? state.conexionStore : conexionInitialState;

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

// Conexion Reducers selectors
const selectIndConexion = () =>
  createSelector(
    conexionReducers,
    dataState => dataState.individualConexions,
  );

const selectOrgConexion = () =>
  createSelector(
    conexionReducers,
    dataState => dataState.organizationConexions,
  );

const selectConexionData = () => {
  createSelector(
    conexionReducers,
    dataState => dataState.createConexion,
  );
};

const selectConexionNotesData = () =>
  createSelector(
    conexionReducers,
    dataState => dataState.conexionNotes,
  );

export {
  selectIndConexion,
  selectOrgConexion,
  selectToken,
  selectGlobalLoader,
  selectConexionData,
  selectConexionNotesData,
};
