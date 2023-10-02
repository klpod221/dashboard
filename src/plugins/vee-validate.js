import { defineRule } from 'vee-validate'

defineRule('required', (value) => {
  if (!value || !value.length) {
    return 'This field is required'
  }

  return true
})

defineRule('email', (value) => {
  if (!value || !value.length) {
    return 'This field is required'
  }

  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  if (!regex.test(value)) {
    return 'Invalid email address';
  }

  return true;
})

defineRule('password', (value) => {
  if (!value || !value.length) {
    return 'This field is required'
  }

  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  if (!regex.test(value)) {
    return 'Password must be at least 8 characters, one uppercase, one lowercase and one number';
  }

  return true
});

defineRule('min', (value, [min]) => {
  if (!value || !value.length) {
    return true;
  }

  if (value.length < min) {
    return `This field must be at least ${min} characters`
  }

  return true
})

defineRule('max', (value, [max]) => {
  if (!value || !value.length) {
    return true;
  }

  if (value.length > max) {
    return `This field must be at most ${max} characters`
  }

  return true
})

defineRule('confirmed', (value, [target], ctx) => {
  if (value !== ctx.form[target]) {
    return 'The confirmation does not match'
  }

  return true
})
