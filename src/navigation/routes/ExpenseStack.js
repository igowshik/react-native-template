import { createStackNavigator } from 'react-navigation';

import ExpenseScreen from 'cnxapp/src/containers/Expense';

import { NAVHEADER } from 'cnxapp/src/utils/colorsConstants';

import { Platform } from 'react-native';
import { EXPENSE } from '../constants';

const ConexionStack = createStackNavigator(
  {
    [EXPENSE]: {
      screen: ExpenseScreen,
      navigationOptions: {
        title: 'EXPENSE',
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
    // SecondScreen: {
    //   screen: DetailScreen,
    //   navigationOptions: {
    //     title: Platform.OS === 'ios' ? '' : 'CONEXION', // set "" initially added "CONEXION" jy
    //     headerStyle: {
    //       backgroundColor: NAVHEADER,
    //     },
    //     headerTitleStyle: {
    //       color: BLUE,
    //       fontFamily:
    //         Platform.OS === 'ios' ? 'Montserrat' : 'Montserrat-SemiBold',
    //       fontWeight: '400',
    //       fontSize: 25,
    //       marginLeft: -10,
    //     },
    //     headerTintColor: BLUE,
    //   },
    // },
  },
  {
    navigationOptions: {
      tabBarLabel: 'Expense',
    },
  },
);

export default ConexionStack;
