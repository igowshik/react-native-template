import produce from 'immer';
import { SET_IND_CONEXIONS, SAVE_EXPENSE_METADATA } from './constants';

export const IntialState = {
  individualConexions: [],
  createConexion: {
    data: {},
    types: '',
  },
  expenseMetadata: {
    expense_status: [],
    expense_type: [],
    payment_method: [],
    costcenter: [],
    business_unit: [],
    expense_item_project_chargeable: [],
  },
};

const expenseRootStore = (state = IntialState, action) =>
  produce(state, draft => {
    const draftState = draft;
    switch (action.type) {
      case SET_IND_CONEXIONS: {
        draftState.individualConexions = action.indConexions;
        break;
      }
      case SAVE_EXPENSE_METADATA: {
        draftState.expenseMetadata = action.metadata;
        break;
      }
      default: {
        // do nothing
      }
    }
  });

export default expenseRootStore;
