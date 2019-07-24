import { createStackNavigator } from 'react-navigation';

import ExpenseScreen from 'cnxapp/src/containers/Expense';
import ExpenseHistory from 'cnxapp/src/containers/Expense/PrimaryScreen/ChildPrimaryScreen';

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
    ExpenseHistory: {
      screen: ExpenseHistory,
      navigationOptions: {
        title: 'Expense History',
        headerStyle: {
          backgroundColor: NAVHEADER,
        },
        headerTitleStyle: {
          color: '#000',
          fontFamily:
            Platform.OS === 'ios' ? 'Montserrat' : 'Montserrat-SemiBold',
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
      tabBarLabel: 'Expense',
    },
  },
);

export default ConexionStack;
