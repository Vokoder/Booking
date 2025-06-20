import { useForm, type SubmitHandler, useWatch } from 'react-hook-form'
import { Row, Col } from "antd";
import SignUpHeader from './sign-up-header'
import { signUp } from '../../../../api/auth/sign-up'
import { type SignUp } from '../form-types'
import { yupResolver } from '@hookform/resolvers/yup';
import { signUpSchema } from './sign-up-validation-schema';
import { MAX_ABOUT_ME_LEN } from './constants';
import { FormField } from '../../../../components/auth/form-field';
import { SubmitButton } from '../../../../components/auth/submit-button';
import { useUser } from '../../../../api/user/useUser';
import { DEFAULT_URL } from "../../../../app/constants"
import { useNavigate } from 'react-router';

export const SignUpForm = () => {
    const {logIn} = useUser()
    const navigate = useNavigate()

    const {
        handleSubmit,
        control,
        setError,
    } = useForm<SignUp>({
        mode: 'onSubmit',
        resolver: yupResolver(signUpSchema),
    })

    const aboutMeText = useWatch({
        control,
        name: 'aboutMe',
        defaultValue: '',
    })
    const aboutMeLen = aboutMeText ? aboutMeText.length : 0

    const onSubmit: SubmitHandler<SignUp> = async (data) => {
        try {
            const userData = await signUp(data)
            await logIn(userData)
            navigate(DEFAULT_URL)
        } catch (e) {
            if (e instanceof Error) {
                if (e.message == 'Пользователь с таким email уже существует') {
                    setError('email', { message: e.message })
                } else {
                    alert(`Произошла ошибка: ${e.message}`)
                }
            } else {
                alert(`Произошла неизвестная ошибка: ${e}`)
            }
        }
    }

    return (<form onSubmit={handleSubmit(onSubmit)}>
        <Row gutter={[0, 32]}>
            <Col span={24}>
                <SignUpHeader />
            </Col>
            <Col span={24}>
                <Row gutter={[0, 16]}>
                    <Col span={24}>
                        <FormField
                            control={control}
                            controllerName='firstName'
                            label='Имя'
                            placeholder='Введите имя'
                            required={true}
                            type="input"
                        />
                    </Col>

                    <Col span={24}>
                        <FormField
                            control={control}
                            controllerName='aboutMe'
                            label='Расскажите о себе'
                            placeholder='Расскажите о себе'
                            required={false}
                            counter={aboutMeLen}
                            maxInputLength={MAX_ABOUT_ME_LEN}
                            type='textarea'
                        />
                    </Col>

                    <Col span={24}>
                        <FormField
                            control={control}
                            controllerName='email'
                            label='Email'
                            placeholder='Введите email'
                            required={true}
                            type="input"
                        />
                    </Col>

                    <Col span={24}>
                        <FormField
                            control={control}
                            controllerName='password'
                            label='Пароль'
                            placeholder='Введите пароль'
                            required={true}
                            isPassword={true}
                            type="input"
                        />
                    </Col>

                    <Col span={24}>
                        <FormField
                            control={control}
                            controllerName='confirmPassword'
                            label='Подтвердите пароль'
                            placeholder='Введите пароль'
                            required={true}
                            isPassword={true}
                            type="input"
                        />
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <SubmitButton>
                    Зарегистрироваться
                </SubmitButton>
            </Col>
        </Row>
    </form>)
}