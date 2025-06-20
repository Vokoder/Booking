import { type ControllerRenderProps, type FieldValues } from 'react-hook-form'
import { Input } from 'antd'

interface TextAreaFieldProps <T extends FieldValues>{
    field: ControllerRenderProps<T>,
    placeholder: string,
    maxInputLength?: number,
}

export const TextAreaField = <T extends FieldValues>(props: TextAreaFieldProps<T>) => {
    return (
        <Input.TextArea
            placeholder={props.placeholder}
            maxLength={props.maxInputLength ? props.maxInputLength : undefined}
            {...props.field}
            className='text-area'
            size='middle'
        />
    )
}