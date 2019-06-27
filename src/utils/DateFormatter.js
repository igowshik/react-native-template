import moment from 'moment';

export const getFormatedDate = date =>
  moment
    .utc(date)
    .local()
    .format('L LT');

export const getDateByFormat = (date, format) =>
  moment
    .utc(date)
    .local()
    .format(format);

export const getDateBefore = days =>
  new Date(
    moment()
      .subtract(days, 'days')
      .calendar(),
  );
