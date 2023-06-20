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
        confirmed:"{field} doesn't match",
        ka:'{field} must contain only Georgian characters',
        en:'{field} must contain only English characters'
      },
      names: {
        firstName: 'Name',
        email: 'Email',
        password:'Password',
        password_confirmation:'Confirm password',
        title_en:'Quote',
        title_ka:'Quote'
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
        confirmed:'{field} არ ემთხვევა პაროლს',
        ka:'{field} უნდა შეიცავლდეს მხოლოდ ქართულ სიმბოლოებს',
        en:'{field} უნდა შეიცავლდეს მხოლოდ ინგლისურ სიმბოლოებს'
      },
      names: {
        username: 'სახელი',
        email: 'მეილი',
        password:'პაროლი',
        password_confirmation:'გაიმეორეთ პაროლი',
        title_en:'ციტატა',
        title_ka:'ციტატა'
      }
    }
  })
})
