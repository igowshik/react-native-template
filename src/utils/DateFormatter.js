import moment from 'moment';

export const getFormatedDate = date =>
  moment(new Date(date), 'L')
    .utc()
    .local()
    .format('L LT');

export const getDateByFormat = (date, format) =>
  moment(date, format)
    .utc()
    .local()
    .format(format);

export const getDateBefore = days =>
  moment()
    .subtract(days, 'days')
    .calendar();
