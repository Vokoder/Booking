import { Select, type SelectProps } from 'antd'
import type { FieldValues } from 'react-hook-form'
import { FormField, type FormFieldProps } from '../form-field'

export type SelectFieldProps<T extends FieldValues> = Omit<FormFieldProps<T>, 'children'> &
  Omit<SelectProps, 'value | onChange'>

export const SelectField = <T extends FieldValues>({
  control,
  controllerName,
  label,
  required,
  options,
  ...props
}: SelectFieldProps<T>) => {
  let coloredOptions = options
  if (options) {
    coloredOptions = options.map((cat) => ({
      value: cat.value,
      label: <span style={{ color: cat.color ? cat.color : 'black' }}>{cat.label}</span>,
    }))
  }

  return (
    <FormField control={control} controllerName={controllerName} label={label} required={required}>
      {({ field, fieldState }) => (
        <Select
          allowClear
          {...field}
          {...props}
          status={fieldState.error === undefined ? '' : 'error'}
          options={coloredOptions}
        />
      )}
    </FormField>
  )
}
