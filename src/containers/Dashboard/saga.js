import { takeLatest, put, call, select } from 'redux-saga/effects';
// absoute imports
import request from 'cnxapp/src/utils/request';
import config from 'cnxapp/src/config/config';
import {
  setRootGlobalLoader,
  setToastMessage,
  setToastVisibility,
} from 'cnxapp/src/app/rootActions';
import { ERROR } from 'cnxapp/src/utils/constants';

// relative imports
import { saveChannelList } from './actions';
import { GET_CHANNEL_LIST, GENERAL_ERROR } from './constants';
import { selectToken } from './selectors';

function* getChannelListAPI() {
  console.log('saga er er');
  yield put(setRootGlobalLoader(true));
  const accessToken = yield select(selectToken());
  console.log('access TOken-------------->', accessToken);
  // const accessToken =
  //   'ABiyrSycT06Akm1K6YPZMNOOGVRIIPfrYcYT00_cnhusMOMH3s127qOQE7wSq3ZL0OiiTjw0c4NTyO6thPhJcVqfRUSWbCI7OoZpJl08-CP6Nm7X3QntxdxSpz7E79WIvPtwx2DBAqc0WoC-DdI4AZte7lpJxel8Nz3cAtefmaguvRyvTTTgmrJwUprW0sAfZD-uSaSxh654K5mzJXFE_YTd2GBXBEwrD7x9yZ0RPcRa2-wTY0bh50bnHtTVHG0r05JTBH3_AqamD0Sx0bag2H6FLqR3QAf9vBWHiLo7mgkQMelxlqsENlH03hbBwX3iZ6EXD3UqOEoH7Ek_vfeBWGT_OQNrV2t7SDllsA38qPfFThfPYyhqEa2nai3pgg7w15fR0LgPhpBpqDREebQ5GUtHYkv8sgGr0tJSIubebBdM8aJahMyqmw_HZOPAMhv2bbE-2EoYocRYpbRY0_P0t63xnT98cE_X7-3_dgW_dFzgowWvzlfJBufAwXChcxwYm7O6iA';
  const requestURL = `${config.apiURL}ChannelList`;
  const options = {
    method: 'GET',
    headers: { Authorization: `Bearer ${accessToken}` },
  };
  const response = yield call(request, requestURL, options);
  console.log('response from saga ', response);
  if (response) {
    yield put(setRootGlobalLoader(false));
    yield put(saveChannelList(response)); // both myChannel and otherChannel
  } else {
    yield put(
      setToastMessage({
        toastMessage: response.message ? response.message : GENERAL_ERROR,
        toastType: ERROR,
      }),
    );
    yield put(setRootGlobalLoader(false));
    yield put(setToastVisibility(true));
  }
}

// function* createConferenceAPI() {
//   yield put(selectGlobalLoader(true));
//   const accessToken = yield select(selectToken())
//   const newConference = ;
// }

export default function* dashboardSaga() {
  yield takeLatest(GET_CHANNEL_LIST, getChannelListAPI);
}
