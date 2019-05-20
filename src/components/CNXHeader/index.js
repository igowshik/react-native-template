import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';
// import * as colors from 'cnxapp/src/utils/colorsConstants';

const primaryColorSet = [
  'rgba(52, 73, 94,1)',
  'rgba(52, 73, 94,1)',
  'rgba(52, 73, 94,1)',
];

const CNXHeader = props => {
  const { children } = props;
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={primaryColorSet}
    >
      <View style={styles.headerViewStyle}>
        <View style={styles.innerView}>{children}</View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  headerViewStyle: {
    height: 50,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    color: '#000',
    fontFamily: 'Montserrat',
    borderColor: 'rgba(0,0,0,0.2)',
    marginLeft: 15,
  },
  innerView: {
    margin: 6,
  },
});

CNXHeader.propTypes = {
  children: PropTypes.any,
};

export default CNXHeader;
