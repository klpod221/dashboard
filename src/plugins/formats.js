import moment from 'moment';

export default {
  date(date, format = 'YYYY-MM-DD') {
    if (!date) return '';

    return moment(date).format(format);
  },

  dateTime(date, format = 'YYYY-MM-DD HH:mm:ss') {
    if (!date) return '';

    return moment(date).format(format);
  },
};
