import React from 'react';
import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer,
  // createBottomTabNavigator,
} from 'react-navigation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5Pro';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

// Absolute imports
import * as Colors from 'cnxapp/src/utils/colorsConstants';

// Relative imports
import AuthLoadingScreen from '../components/AuthLoadingScreen';
import OtherScreen from '../containers/Home/OtherScreen';
import Login from '../containers/Login';
import {
  HOME,
  EXPENSE,
  CONEXION,
  CHAT,
  TIMESHEET,
  CASE,
  TRACKER,
  CONTACT,
  REPORTS,
  MORE,
} from './constants';

// Stack imports
import ConexionStack from './routes/ConexionStack';
import HomeStack from './routes/HomeStack';

const getTabBarIcon = (navigation, focused, tintColor) => {
  const { routeName } = navigation.state;
  const IconComponent = FontAwesome5;

  let iconName;
  if (routeName === HOME) {
    iconName = `home`;
  } else if (routeName === EXPENSE) {
    iconName = `money-bill-alt`;
  } else if (routeName === CONEXION) {
    iconName = `address-book`;
  } else if (routeName === CHAT) {
    iconName = `comments`;
  } else if (routeName === TIMESHEET) {
    iconName = `hourglass`;
  } else if (routeName === CASE) {
    iconName = `life-ring`;
  } else if (routeName === TRACKER) {
    iconName = `flag-checkered`;
  } else if (routeName === CONTACT) {
    iconName = `address-card`;
  } else if (routeName === REPORTS) {
    iconName = `chart-line`;
  } else if (routeName === MORE) {
    iconName = `ellipsis-h`;
  }

  return <IconComponent name={iconName} size={20} color={tintColor} light />;
};

const AppStack = createMaterialBottomTabNavigator(
  {
    HOME: HomeStack,
    CONEXION: ConexionStack,
    CHAT: ConexionStack,
    EXPENSE: { screen: OtherScreen },
    TIMESHEET: { screen: OtherScreen },
    CASE: { screen: OtherScreen },
    TRACKER: { screen: OtherScreen },
    CONTACT: { screen: OtherScreen },
    REPORTS: { screen: OtherScreen },
    MORE: { screen: OtherScreen },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) =>
        getTabBarIcon(navigation, focused, tintColor),
    }),
    // tabBarOptions: {
    //   activeTintColor: Colors.ORANGE,
    //   inactiveTintColor: Colors.ORANGE,
    // },
    initialRouteName: CONEXION,
    activeColor: Colors.WHITE,
    inactiveColor: Colors.DARK,
    barStyle: { backgroundColor: Colors.ORANGE },
  },
);

const AuthStack = createStackNavigator({ SignIn: Login });

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    },
  ),
);
