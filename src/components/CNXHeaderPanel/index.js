import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const CNXHeaderPanel = props => {
  const { Left, Right, children } = props;
  return (
    <View style={styles.rootView}>
      <View style={styles.leftView}>{Left || null}</View>
      <View style={styles.centerView}>{children}</View>
      <View style={styles.rightView}>{Right || null}</View>
    </View>
  );
};

CNXHeaderPanel.propTypes = {
  Left: PropTypes.node,
  Right: PropTypes.node,
  children: PropTypes.node,
};

const styles = StyleSheet.create({
  rootView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderBottomColor: 'rgba(0,0,0,0.1)',
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  leftView: {
    display: 'flex',
    flexDirection: 'row',
    width: '50%',
  },
  rightView: {
    display: 'flex',
    flexDirection: 'row',
  },
  centerView: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export default CNXHeaderPanel;
