import { StyleSheet } from 'react-native';
import { Util } from 'cnxapp/src/utils';

// Absolute imports
import * as Colors from 'cnxapp/src/utils/colorsConstants';

export const conexionStyles = StyleSheet.create({
  surface: {
    padding: 8,
    marginRight: 8,
    height: 60,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    borderRadius: 30,
  },
  linearCircle: {
    height: 60,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
  headerStyle: {
    flexDirection: 'row',
  },
  iconRoundBackground: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 45,
    height: 45,
    borderRadius: 100,
  },
  textMargin: {
    marginLeft: 0,
  },
  viewCol2Style: {
    height: Util.size.height,
  },
  viewCol1Style: {},
  cardContentContainerReport: {
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    flex: 1,
    flexGrow: 1,
    margin: 10,
  },
  cardContentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    flex: 1,
    flexGrow: 1,
    margin: 10,
  },
  linearGradientButton: {
    height: 40,
    borderRadius: 20,
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
    marginBottom: 5,
  },
  headerColStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'space-around',
  },
  headerText: {
    color: 'blue',
  },
  h1Style: {
    marginTop: 7,
  },
  loaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loaderHorizontal: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingTop: 20,
  },
  searchbar: {
    // margin: 2,
    marginBottom: 2,
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.3)',
  },
  filter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // paddingVertical: 8,
    // paddingHorizontal: 16,
  },
});

export const profileViewStyles = StyleSheet.create({
  avatarView: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  cardBodyView: {
    marginLeft: 20,
  },
  linkText: {
    color: Colors.LINK,
    margin: 4,
  },
  extraText: {
    color: Colors.extra,
    margin: 4,
  },
  headerText: {
    color: Colors.BLUE,
  },
  leftViewJustify: {
    justifyContent: 'space-between',
  },
  noConexion: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noConexionImage: {
    width: 550,
    height: 400,
  },
});

export const listViewStyle = StyleSheet.create({
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    alignContent: 'center',
  },
  listBody: {
    margin: 5,
    marginTop: 5,
    alignItems: 'flex-start',
  },
  cardMargin: {
    marginTop: 2,
    marginRight: 1,
    marginLeft: 1,
    height: 70,
  },
});

export const createConexion = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: 8,
  },
  field: {
    width: '100%',
    marginTop: 5,
    fontSize: 14,
  },
});
