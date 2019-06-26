// Native imports
import { StyleSheet } from 'react-native';

// Absolute imports
// import * as Colors from 'cnxapp/src/utils/colorsConstants';
// import { Util } from 'cnxapp/src/utils';

export const Styles = StyleSheet.create({
  mainViewContainer: {
    margin: 20,
    display: 'flex',
  },
  textColor: {
    color: '#fff',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 2,
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.3)',
    height: 50,
  },
  searchbar: {
    // margin: 2,
    flex: 1,
    height: 50,
  },
  datePickerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'center',
    padding: 5,
    height: 50,
  },
  dateField: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    fontSize: 22,
    paddingTop: 10
  },
});
