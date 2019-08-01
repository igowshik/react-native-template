import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PropTypes from 'prop-types';
import * as colors from 'cnxapp/src/utils/colorsConstants';
import { LINEAR_START, LINEAR_END } from 'cnxapp/src/utils/valueconstants';

class Header extends PureComponent {
  render() {
    const { children, gradientColors } = this.props;
    return (
      <LinearGradient
        start={LINEAR_START}
        end={LINEAR_END}
        colors={gradientColors || colors.DEAFULT_HEADER}
      >
        <View style={styles.headerViewStyle}>{children}</View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  headerViewStyle: {
    height: 50,
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

Header.propTypes = {
  children: PropTypes.any,
  gradientColors: PropTypes.array,
};

export default Header;
