import produce from 'immer';
import {
  SET_MY_CHANNEL_LIST,
  SET_SHARED_CHANNEL_LIST,
  SET_INTERACTIONS,
} from './constants';

export const dashboardInitialState = {
  channelsList: {
    MyChannels: [],
  },
  myChannelsList: [],
  otherChannelsList: [],
  getInteractions: [],
};

const dashboardStore = (state = dashboardInitialState, action) =>
  produce(state, draft => {
    const draftState = draft;
    switch (action.type) {
      case SET_MY_CHANNEL_LIST: {
        draftState.myChannelsList = action.channelList;
        break;
      }
      case SET_SHARED_CHANNEL_LIST: {
        draftState.otherChannelsList = action.sharedChannelList;
        break;
      }
      case SET_INTERACTIONS: {
        draftState.getInteractions = action.getInteractions;
        break;
      }
      default: {
        //
      }
    }
  });

export default dashboardStore;
