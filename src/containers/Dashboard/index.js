import React from 'react';
import { DynamicModuleLoader } from 'redux-dynamic-modules';
import { withNavigation } from 'react-navigation';
import PrimaryScreen from './PrimaryScreen';
import { dashboardModule } from './module';

const DashboardScreen = () => (
  <DynamicModuleLoader modules={[dashboardModule()]}>
    <PrimaryScreen />
  </DynamicModuleLoader>
);

export default withNavigation(DashboardScreen);
