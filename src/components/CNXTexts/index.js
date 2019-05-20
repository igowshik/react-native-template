import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';

export const CNXText = props => {
  const { style, children } = props;
  return (
    <Text props style={[style, { fontFamily: 'Proxima Nova' }]}>
      {children}
    </Text>
  );
};

CNXText.propTypes = {
  style: PropTypes.object,
  children: PropTypes.any,
};

export const CNXTextBold = props => {
  const { style, children } = props;
  return (
    <Text style={[style, { fontFamily: 'Proxima Nova', fontWeight: '500' }]}>
      {children}
    </Text>
  );
};

CNXTextBold.propTypes = {
  style: PropTypes.object,
  children: PropTypes.any,
};

export const CNXTextThin = props => {
  const { style, children } = props;
  return (
    <Text style={[style, { fontFamily: 'Proxima Nova', fontWeight: '100' }]}>
      {children}
    </Text>
  );
};

CNXTextThin.propTypes = {
  style: PropTypes.object,
  children: PropTypes.any,
};

export const CNXTextUltraLight = props => {
  const { style, children } = props;
  return (
    <Text style={[style, { fontFamily: 'Proxima Nova', fontWeight: '200' }]}>
      {children}
    </Text>
  );
};

CNXTextUltraLight.propTypes = {
  style: PropTypes.object,
  children: PropTypes.any,
};

export const CNXTextLight = props => {
  const { style, children } = props;
  return (
    <Text style={[style, { fontFamily: 'Proxima Nova', fontWeight: '300' }]}>
      {children}
    </Text>
  );
};

CNXTextLight.propTypes = {
  style: PropTypes.object,
  children: PropTypes.any,
};

export const CNXTextM = props => {
  const { style, children } = props;
  return (
    <Text style={[style, { fontFamily: 'Montserrat', fontWeight: '400' }]}>
      {children}
    </Text>
  );
};

CNXTextM.propTypes = {
  style: PropTypes.object,
  children: PropTypes.any,
};
