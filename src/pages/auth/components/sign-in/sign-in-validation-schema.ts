import * as yup from 'yup';

export const signInSchema = yup.object({
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
}).required();
