import { Controller, useForm, type SubmitHandler } from 'react-hook-form'
import { Row, Col, Input, Button, Typography } from "antd";
import FormErrorMessage from '../FormErrorMessage.tsx'
import FormInputName from '../FormInputName.tsx'
import SignUoHeader from './SignUpHeader.tsx'
import { SignUp } from './SignUp.tsx'
import { type ISignUp } from './IFormTypes.tsx'
import { UserContext } from './UserContext.tsx'
import { useContext } from 'react';

const maxAboutMeLen = 1024//стоит вынести в глобальное состояние

const { Text } = Typography

const RegistrationForm = () => {
    const { contextUser, setContextUser } = useContext(UserContext)
    const { handleSubmit, formState, watch, control, setError } = useForm<ISignUp>({
        mode: 'onSubmit'
    })

    const aboutMeText = watch('aboutMe')
    const aboutMeLen = aboutMeText ? aboutMeText.length : 0

    const onSubmit: SubmitHandler<ISignUp> = (data) => {
        if (data.password !== data.confirmPassword) {
            setError('confirmPassword', {
                type: 'manual',
                message: 'пароли не совпадают',
            })
            return null
        }
        SignUp(data, setContextUser,contextUser)
    }

    return (<form onSubmit={handleSubmit(onSubmit)}>
        <Row gutter={[0, 32]}>
            <Col span={24}>
                <SignUoHeader />
            </Col>
            <Col span={24}>
                <Row gutter={[0, 16]}>
                    <Col span={24}>
                        <Controller
                            name='firstName'
                            control={control}
                            rules={{
                                required: 'Обязательное поле',
                            }}
                            render={({
                                field,
                            }) => (
                                <>
                                    <FormInputName name='Имя' required={true} />
                                    <Input
                                        placeholder='Введите имя'
                                        {...field}
                                    />
                                    <FormErrorMessage message={formState.errors['firstName']?.message} />
                                </>
                            )}
                        />
                    </Col>

                    <Col span={24}>
                        <Controller
                            name='aboutMe'
                            control={control}
                            rules={{
                                maxLength: {
                                    value: maxAboutMeLen,
                                    message: `Число символов не может превышать ${maxAboutMeLen}`
                                }
                            }}
                            render={({
                                field,
                            }) => (
                                <>
                                    <Row justify='space-between' align='middle'>
                                        <Col flex='auto'>
                                            <FormInputName name='Расскажите о себе' />
                                        </Col>
                                        <Col>
                                            <Text type='secondary'>
                                                {aboutMeLen}/{maxAboutMeLen}
                                            </Text>
                                        </Col>
                                    </Row>
                                    <Row justify='start'>
                                        <Input.TextArea
                                            placeholder='Расскажите о себе'
                                            maxLength={maxAboutMeLen}
                                            {...field}
                                            className='text-area'
                                            size='middle'
                                        />
                                    </Row>
                                    <Row justify='start'>
                                        <FormErrorMessage message={formState.errors['aboutMe']?.message} />
                                    </Row>
                                </>
                            )}
                        />
                    </Col>

                    <Col span={24}>
                        <Controller
                            name='email'
                            control={control}
                            rules={{
                                required: 'Обязательное поле',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                    message: 'Некорректный email адрес',
                                },
                            }}
                            render={({
                                field,
                            }) => (
                                <>
                                    <FormInputName name='Email' required={true} />
                                    <Input
                                        placeholder='Введите email'
                                        {...field}
                                    />
                                    <FormErrorMessage message={formState.errors['email']?.message} />
                                </>
                            )}
                        />
                    </Col>

                    <Col span={24}>
                        <Controller
                            name='password'
                            control={control}
                            rules={{
                                required: 'Обязательное поле',
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                                    message: `Пароль не может быть короче 8 символов, должен содержать
                                                            заглавные и строчные буквы, а также цифры`,
                                },
                            }}
                            render={({
                                field,
                            }) => (
                                <>
                                    <FormInputName name='Пароль' required={true} />
                                    <Input.Password
                                        placeholder='Введите пароль'
                                        {...field}
                                    />
                                    <FormErrorMessage message={formState.errors['password']?.message} />
                                </>
                            )}
                        />
                    </Col>

                    <Col span={24}>
                        <Controller
                            name='confirmPassword'
                            control={control}
                            rules={{
                                required: 'Обязательное поле',
                            }}
                            render={({
                                field,
                            }) => (
                                <>
                                    <FormInputName name='Подтвердите пароль' required={true} />
                                    <Input.Password
                                        placeholder='Введите пароль'
                                        {...field}
                                    />
                                    <FormErrorMessage message={formState.errors['confirmPassword']?.message} />
                                </>
                            )}
                        />
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Button type='primary' block htmlType='submit' className='register-submit'>Заригестрироваться</Button>
            </Col>
        </Row>
    </form>)
}

export default RegistrationForm