import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PropTypes from 'prop-types';
import * as colors from 'cnxapp/src/utils/colorsConstants';

const primaryColorSet = [colors.HEADER, colors.HEADER, colors.HEADER];

class Header extends PureComponent {
  render() {
    const { children, gradientColors } = this.props;
    return (
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={gradientColors || primaryColorSet}
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
