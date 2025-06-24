import { type FieldValues } from 'react-hook-form'
import { Input } from 'antd'
import { FormField, type FormFieldProps } from '../form-field'
import type { TextAreaProps } from 'antd/es/input'

type TextAreaFieldProps<T extends FieldValues> = TextAreaProps & FormFieldProps<T>

export const TextAreaField = <T extends FieldValues>({
  control,
  controllerName,
  label,
  required,
  counter,
  ...props
}: TextAreaFieldProps<T>) => {
  return (
    <FormField control={control} controllerName={controllerName} label={label} required={required} counter={counter}>
      {({ field }) => <Input.TextArea {...field} className="text-area" size="middle" {...props} />}
    </FormField>
  )
}
