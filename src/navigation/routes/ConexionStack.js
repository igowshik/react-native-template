import { createStackNavigator } from 'react-navigation';

import ConexionScreen from 'cnxapp/src/containers/Conexion';
import DetailScreen from 'cnxapp/src/containers/Conexion/components/DetailScreen';

import { NAVHEADER } from 'cnxapp/src/utils/colorsConstants';

import { CONEXION } from '../constants';

const ConexionStack = createStackNavigator(
  {
    [CONEXION]: {
      screen: ConexionScreen,
      navigationOptions: {
        title: 'CONEXION',
        headerStyle: {
          backgroundColor: NAVHEADER,
        },
        headerTitleStyle: {
          color: '#000',
          fontFamily: 'Montserrat',
          fontWeight: '400',
          fontSize: 25,
        },
      },
    },
    SecondScreen: {
      screen: DetailScreen,
      navigationOptions: {
        title: '',
        headerStyle: {
          backgroundColor: NAVHEADER,
        },
        headerTitleStyle: {
          color: '#000',
          fontFamily: 'Montserrat',
          fontWeight: '400',
          fontSize: 25,
        },
      },
    },
  },
  {
    navigationOptions: {
      tabBarLabel: 'Conexion',
    },
  },
);

export default ConexionStack;
