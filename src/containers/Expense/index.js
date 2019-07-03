import React from 'react';
import { DynamicModuleLoader } from 'redux-dynamic-modules';
import { withNavigation } from 'react-navigation';
import Expense from './components/Expense';

// Relative Imports
import { getExpenseModule } from './module';

const ExpenseScreen = () => (
  <DynamicModuleLoader modules={[getExpenseModule()]}>
    <Expense />
  </DynamicModuleLoader>
);

export default withNavigation(ExpenseScreen);
