import { defineRule } from 'vee-validate'
import { required, email, min, max,numeric } from '@vee-validate/rules'

defineRule('required', required)
defineRule('email', email)
defineRule('min', min)
defineRule('max', max)
defineRule('number',numeric)



defineRule('confirmed', (value, [target], ctx) => {
  if (value === ctx.form[target]) {
    return true;
  }
  return false;
});


defineRule('lowercase', (value) => {
    if (!value) {
      return false;
    }
    return value === value.toLowerCase();
  });