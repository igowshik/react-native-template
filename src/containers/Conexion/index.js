import React from 'react';
import { DynamicModuleLoader } from 'redux-dynamic-modules';
import { withNavigation } from 'react-navigation';
import Conexion from './components/Conexion';

// Relative Imports
import { getConexionModule } from './module';

const ConexionScreen = () => (
  <DynamicModuleLoader modules={[getConexionModule()]}>
    <Conexion />
  </DynamicModuleLoader>
);

export default withNavigation(ConexionScreen);
