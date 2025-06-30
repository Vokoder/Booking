import { type FieldValues } from 'react-hook-form'
import { Radio, type RadioGroupProps } from 'antd'
import { FormField, type FormFieldProps } from '../form-field'

export type RadioFieldProps<T extends FieldValues> = Omit<FormFieldProps<T>, 'children'> &
  Omit<RadioGroupProps, 'value' | 'onChange'>

export const RadioField = <T extends FieldValues>({
  control,
  controllerName,
  label,
  required,
  ...props
}: RadioFieldProps<T>) => {
  return (
    <FormField control={control} controllerName={controllerName} label={label} required={required}>
      {({ field }) => (
        <Radio.Group
          {...field}
          {...props}
          block
          optionType="button"
          style={{
            display: 'flex',
            flexWrap: 'nowrap',
            whiteSpace: 'nowrap',
          }}
        />
      )}
    </FormField>
  )
}
