import { View } from 'react-native';
import React from 'react';

const HorizDivider = props => {
  const style = Object.assign({}, props.style ? props.style : {}); //eslint-disable-line
  style.borderBottomColor = 'rgba(0,0,0,0.4)';
  style.borderBottomWidth = 1;
  return <View style={style} />;
};

const VerticalDivider = () => (
  <View style={{ borderLeftColor: 'rgba(0,0,0,0.4)', borderLeftWidth: 1 }} />
);

export { HorizDivider, VerticalDivider };
