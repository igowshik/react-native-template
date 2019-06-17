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

const selectConexionId = () =>
  createSelector(
    conexionReducers,
    dataState => dataState.selectedConexion,
  );

const selectConexionDetails = () =>
  createSelector(
    conexionReducers,
    dataState => dataState.conexionDetails,
  );

const selectConexionMetaData = () =>
  createSelector(
    conexionReducers,
    dataState => dataState.metaData,
  );

const selectConexionType = () =>
  createSelector(
    conexionReducers,
    dataState => dataState.selectedConexionType,
  );

const selectAddressModalVisible = () =>
  createSelector(
    conexionReducers,
    dataState => dataState.addressModal,
  );

const selectCreateAddressData = () =>
  createSelector(
    conexionReducers,
    dataState => dataState.createAddressData,
  );

export {
  selectIndConexion,
  selectOrgConexion,
  selectToken,
  selectGlobalLoader,
  selectConexionData,
  selectConexionNotesData,
  selectToastVisibility,
  selectToastData,
  selectConexionId,
  selectConexionDetails,
  selectConexionMetaData,
  selectConexionType,
  selectAddressModalVisible,
  selectCreateAddressData,
};
