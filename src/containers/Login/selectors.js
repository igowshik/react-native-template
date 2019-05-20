import { createSelector } from 'reselect';
import { loginInitialState } from './reducer';
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

export { selectToken, selectLoader };
