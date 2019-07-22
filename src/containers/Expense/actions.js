import {
  SET_IND_CONEXIONS,
  GET_IND_CONEXIONS,
  SAVE_EXPENSE_METADATA,
  GET_EXPENSE_METADATA,
} from './constants';

export function getIndConexions() {
  return { type: GET_IND_CONEXIONS };
}

export const saveIndConexions = indConexions => ({
  type: SET_IND_CONEXIONS,
  indConexions,
});
export const saveExpenseMetaData = metadata => ({
  type: SAVE_EXPENSE_METADATA,
  metadata,
});

export const getExpenseMetadata = () => ({ type: GET_EXPENSE_METADATA });
