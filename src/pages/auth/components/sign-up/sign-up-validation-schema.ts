import * as yup from 'yup';
import { MAX_ABOUT_ME_LEN } from './constants';

export const signUpSchema = yup.object({
  firstName: yup
    .string()
    .trim()
    .required('Обязательное поле'),

  aboutMe: yup
    .string()
    .trim()
    .max(MAX_ABOUT_ME_LEN, `Число символов не может превышать ${MAX_ABOUT_ME_LEN}`)
    .default('')
    .defined(),

  email: yup
    .string()
    .transform((originalValue) =>
      originalValue ? originalValue.toLowerCase() : originalValue
    )
    .required('Обязательное поле')
    .email('Некорректный email адрес'),

  password: yup
    .string()
    .required('Обязательное поле')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
      'Пароль не может быть короче 8 символов, должен содержать заглавные и строчные буквы, а также цифры'
    ),

  confirmPassword: yup
    .string()
    .required('Обязательное поле')
    .oneOf([yup.ref('password')], 'Пароли не совпадают'),
}).required();
