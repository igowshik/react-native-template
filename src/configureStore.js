// createStore allows us to load/unload modules dynamically.
import { createStore } from 'redux-dynamic-modules';
// Saga extension allows us to use Saga middleware in the module store.
import { getSagaExtension } from 'redux-dynamic-modules-saga';
import { compose } from 'redux';
import { getRootModule } from './app/module';

const addPromiseSupportToDispatch = store => {
  const rawDispatch = store.dispatch;
  return action => {
    if (typeof action.then === 'function') {
      return action.then(rawDispatch);
    }
    return rawDispatch(action);
  };
};

const store = createStore(
  {},
  [compose()],
  [getSagaExtension()],
  getRootModule(),
);

store.dispatch = addPromiseSupportToDispatch(store);

export default store;
