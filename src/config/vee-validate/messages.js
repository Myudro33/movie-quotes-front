import { configure } from 'vee-validate'
import { localize } from '@vee-validate/i18n'
configure({
  generateMessage: localize({
    en: {
      messages: {
        required: 'This field is required',
        email: 'This field must be email',
        min: '{field} must be min 0:{min} characters',
        max: '{field} must be max 0:{max} characters',
        number:'{field} must be number',
        lowercase:'{field} must be lowercase',
        confirmed:"{field} doesn't match"
      },
      names: {
        firstName: 'Name',
        email: 'Email',
        password:'Password',
        confirmPassword:'Confirm password'
      }
    },
    ka: {
      messages: {
        required: 'ეს ველი სავალდებულოა',
        email: 'ეს ველი უნდა იყოს მეილის ფორმატში',
        min: '{field} უნდა შედგებოდეს მინიმუმ 0:{min} სიმბოლოსგან',
        max: '{field} უნდა შედგებოდეს მაქსიმუმ 0:{min} სიმბოლოსგან',
        number:'{field} უნდა იყოს რიცხვი',
        lowercase:'{field} უნდა იყოს დაბალ რეგისტრში',
        confirmed:'{field} არ ემთხვევა პაროლს'
      },
      names: {
        username: 'სახელი',
        email: 'მეილი',
        password:'პაროლი',
        confirmPassword:'გაიმეორეთ პაროლი'
      }
    }
  })
})
