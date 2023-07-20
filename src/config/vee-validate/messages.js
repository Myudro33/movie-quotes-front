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
        number: '{field} must be number',
        lowercase: '{field} must be lowercase',
        confirmed: "{field} doesn't match",
        ka: '{field} must contain only Georgian characters',
        en: '{field} must contain only English characters'
      },
      names: {
        firstName: 'Name',
        email: 'Email',
        password: 'Password',
        password_confirmation: 'Confirm password',
        title_en: 'Quote',
        title_ka: 'Quote',
        movie_name_en:"Movie name en",
        movie_name_ka:"Movie name ka",
        year:"Year",
        director_name_en:"Director name en",
        director_name_ka:"Director name ka",
        movie_description_en:"Movie description en",
        movie_description_ka:"Movie description ka",
      }
    },
    ka: {
      messages: {
        required: 'ეს ველი სავალდებულოა',
        email: 'ეს ველი უნდა იყოს მეილის ფორმატში',
        min: '{field} უნდა შედგებოდეს მინიმუმ 0:{min} სიმბოლოსგან',
        max: '{field} უნდა შედგებოდეს მაქსიმუმ 0:{min} სიმბოლოსგან',
        number: '{field} უნდა იყოს რიცხვი',
        lowercase: '{field} უნდა იყოს დაბალ რეგისტრში',
        confirmed: '{field} არ ემთხვევა პაროლს',
        ka: '{field} უნდა შეიცავლდეს მხოლოდ ქართულ სიმბოლოებს',
        en: '{field} უნდა შეიცავლდეს მხოლოდ ინგლისურ სიმბოლოებს'
      },
      names: {
        username: 'სახელი',
        email: 'მეილი',
        password: 'პაროლი',
        password_confirmation:'გაიმეორეთ პაროლი',
        title_en: 'ციტატა',
        title_ka: 'ციტატა',
        movie_name_en:"ფილმის სახელი ინგ",
        movie_name_ka:"ფილმის სახელი ქარ",
        year:"წელი",
        director_name_en:"რეჟისორის სახელი ინგ.",
        director_name_ka:"რეჟისორის სახელი ქარ.",
        movie_description_en:"ფილმის აღწერა ინგ.",
        movie_description_ka:"ფილმის აღწერა ქარ.",
      }
    }
  })
})
