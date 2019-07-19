import { StyleSheet } from 'react-native';

// Absolute imports
import * as Colors from 'cnxapp/src/utils/colorsConstants';

export const conexionStyles = StyleSheet.create({
  headerStyle: {
    flexDirection: 'row',
  },
  searchbar: {
    marginBottom: 2,
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.3)',
  },
  colStart: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  colEnd: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
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
