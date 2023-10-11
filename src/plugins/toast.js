import Swal from 'sweetalert2';

const getMessage = (data) => {
  let message = 'Something went wrong!';
  // check if data is String
  if (typeof data === 'string') {
    message = data;
  }

  // check if data is Object
  if (typeof data === 'object') {
    if (data.response && data.response.data && data.response.data.message) {
      message = data.response.data.message;
    }
  }

  return message;
};

export default {
  success(data) {
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: getMessage(data),
    });
  },

  error(data) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: getMessage(data),
    });
  },
};
