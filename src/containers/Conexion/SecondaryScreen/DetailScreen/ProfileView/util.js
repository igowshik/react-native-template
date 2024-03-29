import * as Colors from 'cnxapp/src/utils/colorsConstants';
import Lo from 'lodash';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { CNXH3 as H3 } from 'cnxapp/src/components/Typography';
import { CREATOR, MANGER } from '../../../constants';

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

export const getContact = (email, phone) => {
  let contactBuffer = '';
  if (email) contactBuffer += email;
  if (phone) {
    if (contactBuffer !== '') contactBuffer += `, `;
    contactBuffer += `${phone}`;
  }
  return <H3 style={styles.headerText}>{contactBuffer}</H3>;
};

export const getCreatedBy = createdBy => {
  if (createdBy)
    return <Text style={styles.createdBy}>created by {createdBy.Name}</Text>;
  return null;
};

export const getShareUser = role => {
  if (role === CREATOR) return Colors.ORANGE;
  if (role === MANGER) return Colors.GREEN;
  return Colors.PURPLE;
};

export const getHomePage = page => {
  if (page) return <H3 style={styles.headerText}>{page}</H3>;
  return null;
};

const styles = StyleSheet.create({
  headerText: {
    color: '#fff',
    margin: 5,
  },
  createdBy: {
    color: '#fff',
    margin: 5,
    fontSize: 18,
    fontStyle: 'italic',
  },
});
