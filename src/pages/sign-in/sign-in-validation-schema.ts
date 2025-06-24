import * as yup from 'yup'
import { REQUIRED, INVALID_EMAIL } from '@constants/validation'

export const signInSchema = yup
  .object({
    email: yup
      .string()
      .transform((originalValue) => (originalValue ? originalValue.toLowerCase() : originalValue))
      .required(REQUIRED)
      .email(INVALID_EMAIL),

    password: yup.string().required(REQUIRED),
  })
  .required()
