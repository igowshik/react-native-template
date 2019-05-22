import React from 'react';
import { Text, Platform } from 'react-native';
import PropTypes from 'prop-types';

export const CNXText = props => {
  const { style, children } = props;
  return (
    <Text
      props
      style={[
        style,
        {
          fontFamily:
            Platform.OS === 'ios' ? 'Proxima Nova' : 'ProximaNova-Regular',
        },
      ]}
    >
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
    <Text
      style={[
        style,
        {
          fontFamily: proxima,
          // Platform.OS === 'ios' ? 'Proxima Nova' : 'ProximaNova-Regular',
          fontWeight: '400', // was 500
          color: '#000',
        },
      ]}
    >
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
    <Text style={[style, { fontFamily: proxima, fontWeight: '300' }]}>
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
    <Text style={[style, { fontFamily: mont, fontWeight: '400' }]}>
      {children}
    </Text>
  );
};

const mont = Platform.OS === 'ios' ? 'Montserrat' : 'Montserrat-Regular';
const proxima = Platform.OS === 'ios' ? 'Proxima Nova' : 'ProximaNova-Regular';

CNXTextM.propTypes = {
  style: PropTypes.object,
  children: PropTypes.any,
};
