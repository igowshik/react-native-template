import { createSelector } from 'reselect';

// Absolute imports
import { rootInitialState } from 'cnxapp/src/app/rootReducer';

// Relative Imports
import { loginInitialState } from './reducer';

const rootReducers = state =>
  state.rootStore ? state.rootStore : rootInitialState;

const LoginReducers = state =>
  state.loginStore ? state.loginStore : loginInitialState;

const selectToken = () =>
  createSelector(
    LoginReducers,
    dataState => dataState.accessToken,
  );

const selectLoader = () =>
  createSelector(
    LoginReducers,
    dataState => dataState.loader,
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

export { selectToken, selectLoader, selectToastVisibility, selectToastData };
