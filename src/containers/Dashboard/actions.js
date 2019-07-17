import { SET_CHANNEL_LIST, GET_CHANNEL_LIST } from './constants';

export const saveChannelList = channelList => ({
  type: SET_CHANNEL_LIST,
  channelList,
});

export const getChannelList = () => ({
  type: GET_CHANNEL_LIST,
});
