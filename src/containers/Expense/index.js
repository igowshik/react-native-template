import React from 'react';
import { DynamicModuleLoader } from 'redux-dynamic-modules';
import { withNavigation } from 'react-navigation';
import SecondaryScreen from './SecondaryScreen';

// Relative Imports
import { getExpenseModule } from './module';

const ExpenseScreen = () => (
  <DynamicModuleLoader modules={[getExpenseModule()]}>
    <SecondaryScreen />
  </DynamicModuleLoader>
);

export default withNavigation(ExpenseScreen);
