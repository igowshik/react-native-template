import { createStackNavigator, withNavigation } from 'react-navigation';
// Absolute imports
import HomeScreen from 'cnxapp/src/containers/Home';
import { NAVHEADER } from 'cnxapp/src/utils/colorsConstants';

import { Platform } from 'react-native';

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        title: 'Welcome to BOAST',
        headerStyle: {
          backgroundColor: NAVHEADER,
        },
        headerTitleStyle: {
          color: '#000',
          fontFamily:
            Platform.OS === 'ios' ? 'Montserrat' : 'Montserrat-Regular',
          fontWeight: '400',
          fontSize: 23,
          // below three lines added ----------------jy
          textAlign: 'center',
          flexGrow: 1,
        },
        // Platform.OS === 'ios' ? ios : android,
      },
    },
  },
  {
    navigationOptions: {
      tabBarLabel: 'Home',
    },
  },
);

export default withNavigation(HomeStack);
