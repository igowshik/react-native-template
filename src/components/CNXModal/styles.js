import { StyleSheet } from 'react-native';
import { Util } from 'cnxapp/src/utils';

const styles = StyleSheet.create({
  modalContent: {
    borderRadius: 15,
    width: Util.size.width - 350,
  },
  mainView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalMiddleView: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    marginLeft: 10,
  },
  modalBottomView: {
    height: 40,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignContent: 'flex-end',
    margin: 15,
    borderColor: 'rgba(0,0,0,0.4)',
  },
  headerCloseButton: {
    margin: 15,
  },
  contentHeader: {
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent',
    marginLeft: 20,
    marginRight: 20,
  },
  headerRight: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  closeButton: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default styles;
