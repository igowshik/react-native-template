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

const selectConexionTimelineData = () =>
  createSelector(
    conexionReducers,
    dataState => dataState.conexionTimeline,
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
const selectIndividualDetails = () =>
  createSelector(
    conexionReducers,
    dataState => dataState.individualDetails,
  );
const selectOrganisationDetails = () =>
  createSelector(
    conexionReducers,
    dataState => dataState.organisationDetails,
  );
const selectIndividualModal = () =>
  createSelector(
    conexionReducers,
    dataState => dataState.conexionModal,
  );

const selectUserDDList = () =>
  createSelector(
    conexionReducers,
    dataState => dataState.userDropDown,
  );

const selectOrgDDList = () =>
  createSelector(
    conexionReducers,
    dataState => dataState.orgDropDown,
  );

const selectEditCNXModal = () =>
  createSelector(
    conexionReducers,
    dataState => dataState.conexionEditModal,
  );

const selectCreateConexionNoteData = () =>
  createSelector(
    conexionReducers,
    dataState => dataState.notesData,
  );

const selectConexionNoteFilter = () =>
  createSelector(
    conexionReducers,
    dataState => dataState.noteFilter,
  );

const selectConexionTimelineFilter = () =>
  createSelector(
    conexionReducers,
    dataState => dataState.timelineFilter,
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
  selectIndividualModal,
  selectIndividualDetails,
  selectUserDDList,
  selectOrgDDList,
  selectOrganisationDetails,
  selectEditCNXModal,
  selectCreateConexionNoteData,
  selectConexionNoteFilter,
  selectConexionTimelineData,
  selectConexionTimelineFilter,
};
