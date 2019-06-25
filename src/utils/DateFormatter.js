import moment from 'moment';

export const getFormatedDate = date =>
  moment
    .utc(date)
    .local()
    .format('L LT');
