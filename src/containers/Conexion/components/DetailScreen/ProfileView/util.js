import * as Colors from 'cnxapp/src/utils/colorsConstants';
import Lo from 'lodash';
import React from 'react';
import { StyleSheet } from 'react-native';
import { CNXH3 as H3 } from 'cnxapp/src/components/Typography';
import { CREATOR } from '../../../constants';

export const getTitleName = (title, displayName) => {
  if (title) return `${title}. ${displayName}`;
  return displayName;
};

export const getOrgName = (JobTitle, org) => {
  if (!Lo.isEmpty(org)) {
    if (JobTitle && !Lo.isEmpty(org))
      return (
        <H3 style={styles.headerText}>{`${JobTitle} at ${org.Name.trim()}`}</H3>
      );
    if (JobTitle)
      return <H3 style={styles.headerText}>{JobTitle + org.Name.trim()}</H3>;
    return <H3 style={styles.headerText}>{org.Name.trim()}</H3>;
  }
  return null;
};

export const getEmail = email => {
  if (email) return <H3 style={styles.headerText}>{email}</H3>;
  return null;
};

export const getPhone = phone => {
  if (phone) return <H3 style={styles.headerText}>{phone}</H3>;
  return null;
};

export const getShareUser = role => {
  if (role === CREATOR) return Colors.ORANGE;
  return Colors.PURPLE;
};

const styles = StyleSheet.create({
  headerText: {
    color: '#fff',
    margin: 5,
  },
});
