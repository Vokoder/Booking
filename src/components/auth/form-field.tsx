import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form'
import type { InputTypes } from '../../pages/auth/components/form-types'
import { FormInputName } from './form-input-name'
import { ErrorMessage } from './form-error-message'
import { Col, Row, Typography } from 'antd'
import { InputField } from './input-field'
import { TextAreaField } from './textarea-field'

interface FormFieldProps<T extends FieldValues> {
    control: Control<T>;
    controllerName: Path<T>;
    label: string,
    placeholder: string,
    required: boolean,
    counter?: number,
    maxInputLength?: number,
    isPassword?: boolean,
    type: keyof InputTypes,
}

const { Text } = Typography

export const FormField = <T extends FieldValues>(props: FormFieldProps<T>) => {
    return (
        <Controller
            name={props.controllerName}
            control={props.control}
            render={({
                field,
                fieldState: { error },
            }) => (
                <>
                    <Row justify='space-between' align='middle'>
                        <Col flex='auto'>
                            <FormInputName
                                name={props.label}
                                required={props.required}
                            />
                        </Col>
                        {
                            (props.counter !== undefined && props.maxInputLength !== undefined)
                            && (
                                <Col>
                                    <Text type='secondary'>
                                        {props.counter}/{props.maxInputLength}
                                    </Text>
                                </Col>
                            )
                        }
                    </Row>

                    <Row justify='start'>
                        {
                            props.type === "input" ? (
                                <InputField
                                    field={field}
                                    placeholder={props.placeholder}
                                    isPassword={props.isPassword !== undefined ? props.isPassword : false}
                                    error={error}
                                />
                            ) : (
                                <TextAreaField
                                    field={field}
                                    placeholder={props.placeholder}
                                    maxInputLength={props.maxInputLength ? props.maxInputLength : undefined}
                                />
                            )
                        }
                    </Row>

                    <Row justify='start'>
                        <ErrorMessage message={error?.message} />
                    </Row>
                </>
            )}
        />
    )
}