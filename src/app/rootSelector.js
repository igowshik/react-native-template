import { createSelector } from 'reselect';
import { rootInitialState } from './rootReducer';
const rootReducers = state =>
  state.rootReducers ? state.rootReducers : rootInitialState;

const selectToastData = () =>
  createSelector(
    rootReducers,
    dataState => dataState.toast,
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

const selectToastVisibility = () =>
  createSelector(
    rootReducers,
    dataState => dataState.toastVisible,
  );
export {
  selectToastData,
  selectGlobalLoader,
  selectRootAccessToken,
  selectToastVisibility,
};
