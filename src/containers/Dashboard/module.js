import dashboardReducer from './reducer';
import dashboardSaga from './saga';

export function dashboardModule() {
  return {
    id: 'dashboardStore-manually804r5j34r8349jrUnified',
    reducerMap: {
      dashboardStore: dashboardReducer,
    },
    sagas: [dashboardSaga],
  };
}
