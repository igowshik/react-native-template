import { createStackNavigator, withNavigation } from 'react-navigation';
// Absolute imports
import HomeScreen from 'cnxapp/src/containers/Home';
import { NAVHEADER } from 'cnxapp/src/utils/colorsConstants';

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
          fontFamily: 'Montserrat',
          fontWeight: '400',
          fontSize: 23,
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
