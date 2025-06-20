import { type ControllerRenderProps, type FieldError, type FieldValues } from 'react-hook-form'
import { Input } from 'antd'

interface InputFieldProps<T extends FieldValues> {
  field: ControllerRenderProps<T>,
  placeholder: string,
  isPassword: boolean,
  error?: FieldError,
}

export const InputField = <T extends FieldValues>(props: InputFieldProps<T>) => {
  return (
    props.isPassword ? (
      <Input.Password
        status={props.error === undefined ? "" : "error"}
        placeholder={props.placeholder}
        {...props.field}
      />
    ) : (
      <Input
        status={props.error === undefined ? "" : "error"}
        placeholder={props.placeholder}
        {...props.field}
      />
    )
  )
}