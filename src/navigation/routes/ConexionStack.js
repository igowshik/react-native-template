import { createStackNavigator } from 'react-navigation';

import ConexionScreen from 'cnxapp/src/containers/Conexion';
import DetailScreen from 'cnxapp/src/containers/Conexion/SecondaryScreen/DetailScreen';

import { NAVHEADER } from 'cnxapp/src/utils/colorsConstants';

import { Platform } from 'react-native';
import { CONEXION } from '../constants';

const ConexionStack = createStackNavigator(
  {
    [CONEXION]: {
      screen: ConexionScreen,
      navigationOptions: {
        title: 'Conexion',
        headerStyle: {
          backgroundColor: NAVHEADER,
        },
        headerTitleStyle: {
          color: '#000',
          fontFamily:
            Platform.OS === 'ios' ? 'Montserrat' : 'Montserrat-Regular',
          fontWeight: '400',
          fontSize: 25,
          flexGrow: 1,
          textAlign: 'center',
        },
      },
    },
    SecondScreen: {
      screen: DetailScreen,
      navigationOptions: {
        title: 'Conexion Details',
        headerStyle: {
          backgroundColor: NAVHEADER,
        },
        headerTitleStyle: {
          color: '#000',
          fontFamily:
            Platform.OS === 'ios' ? 'Montserrat' : 'Montserrat-Regular',
          fontWeight: '400',
          fontSize: 25,
          flexGrow: 1,
          textAlign: 'center',
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
