import React from 'react';
import PropTypes from 'prop-types';
import { H1, H2, H3 } from 'native-base';

import { CNXText } from '../Texts';

// added by jy
export const CNXH1 = props => {
  const { children } = props;
  const style = Object.assign({}, props.style ? props.style : {}); //eslint-disable-line
  style.color = style.color ? style.color : '#000';
  return (
    <H1
      style={[
        style,
        {
          fontFamily:
            Platform.OS === 'ios' ? 'Montserrat' : 'Montserrat-Regular',
        },
      ]}
    >
      {children}
    </H1>
  );
};

CNXH1.propTypes = {
  style: PropTypes.object,
  children: PropTypes.any,
};

export const CNXH2 = props => {
  const { children } = props;
  const style = Object.assign({}, props.style ? props.style : {}); //eslint-disable-line
  style.color = style.color ? style.color : '#000';
  return (
    <H2
      style={[
        style,
        {
          fontFamily:
            Platform.OS === 'ios' ? 'Montserrat' : 'Montserrat-Regular',
        },
      ]}
    >
      {children}
    </H2> // initially was Montserrat -> Montserrat-Regular'
  );
};

CNXH2.propTypes = {
  style: PropTypes.object,
  children: PropTypes.any,
};

export const CNXH3 = props => {
  const { children } = props;
  const style = Object.assign({}, props.style ? props.style : {}); //eslint-disable-line
  style.color = style.color ? style.color : '#000';
  return (
    <H3
      style={[
        style,
        {
          fontFamily:
            Platform.OS === 'ios' ? 'Montserrat' : 'Montserrat-Regular',
        },
      ]}
    >
      {children}
    </H3>
  ); // initially was Montserrat -> Montserrat-Regular'
};

CNXH3.propTypes = {
  style: PropTypes.object,
  children: PropTypes.any,
};

export const CNXH4 = props => {
  const { children } = props;
  const style = Object.assign({}, props.style ? props.style : {}); //eslint-disable-line
  style.color = style.color ? style.color : '#000';
  style.fontFamily = 'Montserrat';
  // style.fontFamily =
  //   Platform.OS === 'ios' ? 'Montserrat' : 'Montserrat-Regular';
  style.fontSize = 20;
  style.padding = 10;
  return <CNXText style={style}>{children}</CNXText>;
};

CNXH4.propTypes = {
  style: PropTypes.object,
  children: PropTypes.any,
};
