import produce from 'immer';
import { SET_CHANNEL_LIST } from './constants';

export const dashboardInitialState = {
  channelsList: {},
  myChannelsList: [],
  otherChannelsList: [],
};

const dashboardStore = (state = dashboardInitialState, action) =>
  produce(state, draft => {
    const draftState = draft;
    switch (action.type) {
      case SET_CHANNEL_LIST: {
        draftState.channelsList = action.channelList;
        break;
      }
      default: {
        //
      }
    }
  });

export default dashboardStore;
