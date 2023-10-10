import moment from 'moment';

const date = (date, format = 'YYYY-MM-DD') => {
  if (!date) return '';

  return moment(date).format(format);
};

const dateTime = (date, format = 'YYYY-MM-DD HH:mm:ss') => {
  if (!date) return '';

  return moment(date).format(format);
};

export default {
  date,
  dateTime
};
