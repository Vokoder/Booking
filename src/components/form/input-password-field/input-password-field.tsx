import { type FieldValues } from 'react-hook-form'
import { Input } from 'antd'
import { FormField, type FormFieldProps } from '../form-field'
import type { PasswordProps } from 'antd/es/input'

type InputPasswordFieldProps<T extends FieldValues> = PasswordProps & FormFieldProps<T>

export const InputPasswordField = <T extends FieldValues>({
  control,
  controllerName,
  ...props
}: InputPasswordFieldProps<T>) => {
  const { required, ...inputProps } = props
  return (
    <FormField control={control} controllerName={controllerName} label={props.label} required={required}>
      {({ field, fieldState }) => (
        <Input.Password status={fieldState.error === undefined ? '' : 'error'} {...field} {...inputProps} />
      )}
    </FormField>
  )
}
