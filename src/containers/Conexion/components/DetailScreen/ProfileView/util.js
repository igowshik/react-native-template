import * as Colors from 'cnxapp/src/utils/colorsConstants';
import { CREATOR } from '../../../constants';

export const getTitleName = (title, displayName) => {
  if (title) return `${title}. ${displayName}`;
  return displayName;
};
export const getOrgName = org => {
  if (org) return org.Name.trim();
  return null;
};
export const getShareUser = role => {
  if (role === CREATOR) return Colors.ORANGE;
  return Colors.PURPLE;
};
