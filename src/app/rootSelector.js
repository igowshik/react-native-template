import { createSelector } from 'reselect';
import { rootInitialState } from './rootReducer';
const rootReducers = state =>
  state.rootReducers ? state.rootReducers : rootInitialState;

const selectToastMessage = () =>
  createSelector(
    rootReducers,
    dataState => dataState.toastMessage,
  );

const selectGlobalLoader = () =>
  createSelector(
    rootReducers,
    dataState => dataState.globalLoader,
  );

const selectRootAccessToken = () =>
  createSelector(
    rootReducers,
    dataState => dataState.accessToken,
  );

export { selectToastMessage, selectGlobalLoader, selectRootAccessToken };
