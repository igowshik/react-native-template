import { createStackNavigator, withNavigation } from 'react-navigation';
// Absolute imports
import HomeScreen from 'cnxapp/src/containers/Home';
import { NAVHEADER } from 'cnxapp/src/utils/colorsConstants';

// added jy
import { Platform } from 'react-native';

// ------------------------------------------------------>>>>>
const HomeStack = createStackNavigator(
  {
    Home:
      Platform.OS === 'ios'
        ? {
          screen: HomeScreen,
          navigationOptions: {
            title: 'Welcome to Conexus Platform',
            headerStyle: {
              backgroundColor: NAVHEADER,
            },
            headerTitleStyle: {
              color: '#000',
              fontFamily: 'Montserrat',
              fontWeight: '400',
              fontSize: 23,
              },
            },
          }
        : {
          screen: HomeScreen,
          navigationOptions: {
            title: 'Welcome to Conexus Platform',
            headerStyle: {
              backgroundColor: NAVHEADER,
            },
            headerTitleStyle: {
              color: '#000',
              fontFamily: 'Montserrat-Regular',
              fontWeight: '400',
              fontSize: 23,
              // below three lines added ----------------jy
                textAlign: 'center',
              flexGrow: 1,
            },
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
