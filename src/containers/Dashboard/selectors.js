import { createSelector } from 'reselect';

// absolute imports
import { rootInitialState } from 'cnxapp/src/app/rootReducer';

// Relative imports
import { dashboardInitialState } from './reducer';

const rootReducers = state =>
  state.rootStore ? state.rootStore : rootInitialState;

const dashboardReducers = state =>
  state.dashboardStore ? state.dashboardStore : dashboardInitialState;

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

const selectChannelList = () =>
  createSelector(
    dashboardReducers,
    dataState => dataState.myChannelsList,
  );
const selectOtherChannelList = () =>
  createSelector(
    dashboardReducers,
    dataState => dataState.otherChannelsList,
  );
const selectGetInteractions = () =>
  createSelector(
    dashboardReducers,
    dataState => dataState.getInteractions,
  );
export {
  selectToken,
  selectGlobalLoader,
  selectToastVisibility,
  selectToastData,
  selectChannelList,
  selectOtherChannelList,
  selectGetInteractions,
};
