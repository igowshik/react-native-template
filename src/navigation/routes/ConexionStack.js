import { createStackNavigator } from 'react-navigation';

import ConexionScreen from 'cnxapp/src/containers/Conexion';
import DetailScreen from 'cnxapp/src/containers/Conexion/SecondaryScreen/DetailScreen';

import { NAVHEADER, BLUE } from 'cnxapp/src/utils/colorsConstants';

import { Platform } from 'react-native';
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
        title: Platform.OS === 'ios' ? '' : 'CONEXION', // set "" initially added "CONEXION" jy
        headerStyle: {
          backgroundColor: NAVHEADER,
        },
        headerTitleStyle: {
          color: BLUE,
          fontFamily:
            Platform.OS === 'ios' ? 'Montserrat' : 'Montserrat-SemiBold',
          fontWeight: '400',
          fontSize: 25,
          marginLeft: -10,
        },
        headerTintColor: BLUE,
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
