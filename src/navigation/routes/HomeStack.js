import { createStackNavigator, withNavigation } from 'react-navigation';
// Absolute imports
import HomeScreen from 'cnxapp/src/containers/Home';
import { NAVHEADER } from 'cnxapp/src/utils/colorsConstants';

// added jy
import { Platform } from 'react-native';

// ------------------------------------------------------>>>>>
const HomeStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        title: 'Welcome to Conexus Platform',
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

const ios = {
  color: '#000',
  fontFamily: 'Montserrat',
  fontWeight: '400',
  fontSize: 23,
};
const android = {
  color: '#000',
  fontFamily: 'Montserrat-Regular',
  fontWeight: '400',
  fontSize: 23,
  // below three lines added ----------------jy
  textAlign: 'center',
  flexGrow: 1,
};

export default withNavigation(HomeStack);
