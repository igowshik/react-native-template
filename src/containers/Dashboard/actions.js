import {
  SET_MY_CHANNEL_LIST,
  GET_MY_CHANNEL_LIST,
  GET_SHARED_CHANNEL_LIST,
  SET_SHARED_CHANNEL_LIST,
  SET_INTERACTIONS,
} from './constants';

export const saveMyChannelList = channelList => ({
  type: SET_MY_CHANNEL_LIST,
  channelList,
});

export const getMyChannelList = () => ({
  type: GET_MY_CHANNEL_LIST,
});

export const getSharedChannelList = () => ({
  type: GET_SHARED_CHANNEL_LIST,
});
export const saveSharedChannelList = sharedChannelList => ({
  type: SET_SHARED_CHANNEL_LIST,
  sharedChannelList,
});
export const saveGetinteractions = getInteractions => ({
  type: SET_INTERACTIONS,
  getInteractions,
});
