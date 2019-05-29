import { StyleSheet } from 'react-native';
import * as Colors from 'cnxapp/src/utils/colorsConstants';

export const secondaryButtonGradientStyle = StyleSheet.create({
  linearGradientButton: {
    borderRadius: 8,
  },
  viewButton: {
    shadowColor: '#5D6D7E',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,
    elevation: 17,
  },
  touchViewStyle: {
    margin: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    alignContent: 'center',
  },
  buttonTextStyle: {
    color: Colors.white,
    fontWeight: '500',
    fontSize: 14,
  },
});

export const secondaryButtonStyle = StyleSheet.create({
  linearGradientButton: {
    borderRadius: 8,
  },
  touchViewStyle: {
    margin: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    alignContent: 'center',
  },
  buttonTextStyle: {
    color: Colors.white,
    fontWeight: '500',
    fontSize: 14,
  },
});
