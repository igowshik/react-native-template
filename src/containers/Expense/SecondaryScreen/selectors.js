import { createSelector } from 'reselect';

// Relative imports
import { IntialState } from './reducer';

const store = state =>
  state.expenseSecondaryScreenStore
    ? state.expenseSecondaryScreenStore
    : IntialState;

const selectIndConexion = () =>
  createSelector(
    store,
    dataState => dataState.individualConexions,
  );

export { selectIndConexion };
