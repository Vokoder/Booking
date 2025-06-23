import { type Control, type FieldValues, type Path } from 'react-hook-form'
import { Input, type InputProps } from 'antd'
import { FormField } from './form-field'

interface InputFieldProps<T extends FieldValues> extends InputProps {
  control: Control<T>,
  controllerName: Path<T>,
  label: string,
  placeholder: string,
  required: boolean,
  isPassword?: boolean,
}

export const InputField = <T extends FieldValues>({ control, controllerName, ...props }: InputFieldProps<T>) => {
  return (
    <FormField control={control} controllerName={controllerName} label={props.label} required={props.required}>
      {({ field, fieldState }) => (
        <Input
          status={fieldState.error === undefined ? "" : "error"}
          placeholder={props.placeholder}
          {...field}
        />)}
    </FormField>
  )
}

export const InputPasswordField = <T extends FieldValues>({ control, controllerName, ...props }: InputFieldProps<T>) => {
  return (
    <FormField control={control} controllerName={controllerName} label={props.label} required={props.required}>
      {({ field, fieldState }) => (
        <Input.Password
          status={fieldState.error === undefined ? "" : "error"}
          placeholder={props.placeholder}
          {...field}
        />)}
    </FormField>
  )
}

interface TextAreaFieldProps<T extends FieldValues> {
  control: Control<T>,
  controllerName: Path<T>,
  label: string,
  placeholder: string,
  required: boolean,
  maxInputLength?: number,
  counter?: number,
}

export const TextAreaField = <T extends FieldValues>({ control, controllerName, ...props }: TextAreaFieldProps<T>) => {
  return (
    <FormField control={control} controllerName={controllerName} label={props.label} required={props.required} counter={props.counter} maxInputLength={props.maxInputLength}>
      {({ field }) => (
        <Input.TextArea
          placeholder={props.placeholder}
          maxLength={props.maxInputLength}
          {...field}
          className='text-area'
          size='middle'
        />)}
    </FormField>
  )
}