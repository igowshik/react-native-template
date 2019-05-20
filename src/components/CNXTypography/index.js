import React from 'react';
import PropTypes from 'prop-types';
import { H1, H2, H3 } from 'native-base';

import { CNXText } from '../CNXTexts';

export const CNXH1 = props => {
  const { children } = props;
  const style = Object.assign({}, props.style ? props.style : {}); //eslint-disable-line
  style.color = style.color ? style.color : '#000';
  return <H1 style={[style, { fontFamily: 'Montserrat' }]}>{children}</H1>;
};

CNXH1.propTypes = {
  style: PropTypes.object,
  children: PropTypes.any,
};

export const CNXH2 = props => {
  const { children } = props;
  const style = Object.assign({}, props.style ? props.style : {}); //eslint-disable-line
  style.color = style.color ? style.color : '#000';
  return <H2 style={[style, { fontFamily: 'Montserrat' }]}>{children}</H2>;
};

CNXH2.propTypes = {
  style: PropTypes.object,
  children: PropTypes.any,
};

export const CNXH3 = props => {
  const { children } = props;
  const style = Object.assign({}, props.style ? props.style : {}); //eslint-disable-line
  style.color = style.color ? style.color : '#000';
  return <H3 style={[style, { fontFamily: 'Montserrat' }]}>{children}</H3>;
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
  style.fontSize = 20;
  return <CNXText style={style}>{children}</CNXText>;
};

CNXH4.propTypes = {
  style: PropTypes.object,
  children: PropTypes.any,
};
