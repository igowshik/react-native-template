import { StyleSheet } from 'react-native';
import * as colors from 'cnxapp/src/utils/colorsConstants';

export const primaryButtonGradientStyle = StyleSheet.create({
  linearGradientButton: {
    borderRadius: 5,
  },
  viewButton: {
    shadowColor: '#9b9ba2',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,
    elevation: 17,
  },
  touchViewStyle: {
    margin: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    alignContent: 'center',
  },
  buttonTextStyle: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 14,
  },
});

export const primaryButtonStyle = StyleSheet.create({
  linearGradientButton: {
    borderRadius: 5,
    borderColor: colors.PRIMARY,
    borderWidth: 1,
  },
  linearDisabled: {
    borderRadius: 5,
    borderColor: 'rgba(0,0,0,0.5)',
    borderWidth: 1,
  },
  touchViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    alignContent: 'center',
  },
  buttonTextStyle: {
    margin: 5,
    color: colors.PRIMARY,
    fontWeight: '500',
    fontSize: 14,
  },
  buttonTextDisabled: {
    margin: 5,
    color: 'rgba(0,0,0,0.3)',
    fontWeight: '500',
    fontSize: 14,
  },
});

export const primaryRounded = StyleSheet.create({
  linearGradientButton: {
    borderRadius: 10,
  },
  viewButton: {
    shadowColor: colors.GREY,
    shadowOffset: {
      width: 0,
      height: 10,
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
    color: '#fff',
  },
});
