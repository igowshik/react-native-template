import React from 'react';
import { DynamicModuleLoader } from 'redux-dynamic-modules';
import { withNavigation } from 'react-navigation';
import PrimaryScreen from './PrimaryScreen';

// Relative Imports
import { getExpenseModule } from './module';

const ExpenseScreen = () => (
  <DynamicModuleLoader modules={[getExpenseModule()]}>
    <PrimaryScreen />
  </DynamicModuleLoader>
);

export default withNavigation(ExpenseScreen);
