import produce from 'immer';
import { SET_IND_CONEXIONS } from './constants';

export const expenseIntialState = {
  individualConexions: [],
  createConexion: {
    data: {},
    types: '',
  },
};

const expenseStore = (state = expenseIntialState, action) =>
  produce(state, draft => {
    const draftState = draft;
    switch (action.type) {
      case SET_IND_CONEXIONS: {
        draftState.individualConexions = action.indConexions;
        break;
      }
      default: {
        // do nothing
      }
    }
  });

export default expenseStore;
