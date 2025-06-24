import * as yup from 'yup'
import { MAX_ABOUT_ME_LEN } from '@pages/auth/components/sign-up/constants'
import { REQUIRED, INVALID_EMAIL, WEAK_PASSWORD } from '@constants/validation'

export const signUpSchema = yup
  .object({
    firstName: yup.string().trim().required(REQUIRED),

    aboutMe: yup
      .string()
      .trim()
      .max(MAX_ABOUT_ME_LEN, `Число символов не может превышать ${MAX_ABOUT_ME_LEN}`)
      .default('')
      .defined(),

    email: yup
      .string()
      .transform((originalValue) => (originalValue ? originalValue.toLowerCase() : originalValue))
      .required(REQUIRED)
      .email(INVALID_EMAIL),

    password: yup
      .string()
      .required(REQUIRED)
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, WEAK_PASSWORD),

    confirmPassword: yup
      .string()
      .required(REQUIRED)
      .oneOf([yup.ref('password')], 'Пароли не совпадают'),
  })
  .required()
