import { type FieldValues } from 'react-hook-form'
import { DatePicker, type DatePickerProps } from 'antd'
import { FormField, type FormFieldProps } from '../form-field'
import dayjs, { type Dayjs } from 'dayjs'

export type DateFieldProps<T extends FieldValues> = Omit<FormFieldProps<T>, 'children'> &
  Omit<DatePickerProps, 'value' | 'onChange'>

export const DateField = <T extends FieldValues>({
  control,
  controllerName,
  label,
  required,
  ...props
}: DateFieldProps<T>) => {
  return (
    <FormField control={control} controllerName={controllerName} label={label} required={required}>
      {({ field }) => {
        const dateValue: Dayjs | undefined = field.value ? dayjs(field.value as Date) : undefined
        return (
          <DatePicker
            {...props}
            value={dateValue}
            onChange={(date) => {
              field.onChange(date ? (date as Dayjs).toDate() : undefined)
            }}
            onBlur={field.onBlur}
          />
        )
      }}
    </FormField>
  )
}
