import { StyleSheet } from 'react-native';

// Absolute imports
import { Util } from 'cnxapp/src/utils';

// define your styles
export const styles = StyleSheet.create({
  containerView: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 4,
  },
  logo: {
    position: 'absolute',
    width: 100,
    height: 100,
    marginTop: 20,
  },
  parentViewWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 60,
  },
  loginContainer: {
    height: Util.size.height / 3,
    width: Util.size.width / 2,
    borderColor: 'rgba(0,0,0,0.3)',
    borderWidth: 1,
    backgroundColor: 'rgba(255,255,255,1)',
    borderRadius: 8,
  },
  logoContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fieldContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
});
