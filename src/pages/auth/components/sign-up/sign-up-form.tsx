import { useForm, type SubmitHandler, useWatch } from 'react-hook-form'
import { Row, Col } from "antd";
import { SignUpHeader } from '@pages/auth/components/sign-up'
import { signUp } from '@api/auth'
import { type SignUp } from '@/pages/auth/components/form.types'
import { yupResolver } from '@hookform/resolvers/yup';
import { signUpSchema } from '@pages/auth/components/sign-up';
import { MAX_ABOUT_ME_LEN, USE_SIGN_IN_TEXT, USE_SIGN_IN_BUTTON } from '@pages/auth/components/sign-up';
import { SubmitButton } from '@/components/form/submit-button';
import { useUser } from '@/app/auth';
import { DEFAULT_URL, SIGN_IN_URL } from "@constants/routes"
import { useNavigate } from 'react-router';
import { FirebaseError } from 'firebase/app';
import * as codes from '@/constants/error-codes';
import * as validation from '@/constants/validation';
import { AuthLayout } from '@pages/auth';
import { Footer } from '@pages/auth/components/footer';
import { InputField, InputPasswordField, TextAreaField } from '@/components/form/input-field';
import { useAlert } from '@/app/alert';
import { AUTH_ERROR } from "./constants"

export const SignUpForm = () => {
    const { logIn } = useUser()
    const navigate = useNavigate()
    const { showAlert, hideAlert } = useAlert()

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
            hideAlert()
        } catch (e) {
            if (e instanceof Error) {
                if (e instanceof FirebaseError && e.code === codes.EMAIL_ALREDY_IN_USE) {
                    setError('email', { message: validation.EMAIL_ALREDY_IN_USE })
                } else {
                    showAlert({ type: "warning", message:AUTH_ERROR})
                }
            } else {
                showAlert({ type: "warning", message:AUTH_ERROR})
            }
        }
    }

    const handleClick = () => {
        navigate(SIGN_IN_URL)
    }

    return (
        <AuthLayout footer={<Footer text={USE_SIGN_IN_TEXT} subText={USE_SIGN_IN_BUTTON} onClick={handleClick} />}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Row gutter={[0, 32]}>
                    <Col span={24}>
                        <SignUpHeader />
                    </Col>
                    <Col span={24}>
                        <Row gutter={[0, 16]}>
                            <Col span={24}>
                                <InputField<SignUp>
                                    control={control}
                                    controllerName='firstName'
                                    label='Имя'
                                    placeholder='Введите имя'
                                    required={true}
                                />
                            </Col>

                            <Col span={24}>
                                <TextAreaField<SignUp>
                                    control={control}
                                    controllerName='aboutMe'
                                    label='Расскажите о себе'
                                    placeholder='Расскажите о себе'
                                    required={false}
                                    counter={aboutMeLen}
                                    maxInputLength={MAX_ABOUT_ME_LEN}
                                />
                            </Col>

                            <Col span={24}>
                                <InputField<SignUp>
                                    control={control}
                                    controllerName='email'
                                    label='Email'
                                    placeholder='Введите email'
                                    required={true}
                                />
                            </Col>

                            <Col span={24}>
                                <InputPasswordField<SignUp>
                                    control={control}
                                    controllerName='password'
                                    label='Пароль'
                                    placeholder='Введите пароль'
                                    required={true}
                                    isPassword={true}
                                />
                            </Col>

                            <Col span={24}>
                                <InputPasswordField<SignUp>
                                    control={control}
                                    controllerName='confirmPassword'
                                    label='Подтвердите пароль'
                                    placeholder='Введите пароль'
                                    required={true}
                                    isPassword={true}
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
            </form>
        </AuthLayout>
    )
}