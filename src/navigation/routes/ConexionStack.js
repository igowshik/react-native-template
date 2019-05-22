import { createStackNavigator } from 'react-navigation';

import ConexionScreen from 'cnxapp/src/containers/Conexion';
import DetailScreen from 'cnxapp/src/containers/Conexion/components/DetailScreen';

import { NAVHEADER } from 'cnxapp/src/utils/colorsConstants';

import { Platform } from 'react-native';
import { CONEXION } from '../constants';

const ConexionStack = createStackNavigator(
  {
    [CONEXION]:
      Platform.OS === 'ios'
        ? {
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
        }
        : {
          screen: ConexionScreen,
          navigationOptions: {
            title: 'CONEXION',
            headerStyle: {
              backgroundColor: NAVHEADER,
            },
            headerTitleStyle: {
              color: '#000',
              fontFamily: 'Montserrat-Regular',
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
