import { useForm, type SubmitHandler, useWatch } from 'react-hook-form'
import { Row, Col } from 'antd'
import { SignUpHeader } from './components/sign-up-header'
import { signUp } from '@api/auth'
import { type SignUp } from './sign-up.types'
import { yupResolver } from '@hookform/resolvers/yup'
import { signUpSchema } from './sign-up-validation-schema'
import { MAX_ABOUT_ME_LEN, USE_SIGN_IN_TEXT, USE_SIGN_IN_BUTTON } from './sign-up.constants'
import { SubmitButton } from '@components/form'
import { useUser } from '@app/auth'
import { DEFAULT_URL, SIGN_IN_URL } from '@constants/routes'
import { useNavigate } from 'react-router'
import { FirebaseError } from 'firebase/app'
import * as codes from '@constants/error-codes'
import * as validation from '@constants/validation'
import { AuthLayout } from '@layouts/auth-layout'
import { FooterText } from '@/components/footer-text'
import { InputField, InputPasswordField, TextAreaField } from '@components/form'
import { useAlert } from '@app/alert'
import { AUTH_ERROR } from './sign-up.constants'

export const SignUpForm = () => {
  const { logIn } = useUser()
  const navigate = useNavigate()
  const { showAlert, hideAlert } = useAlert()

  const { handleSubmit, control, setError } = useForm<SignUp>({
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
          showAlert({ type: 'warning', message: AUTH_ERROR })
        }
      } else {
        showAlert({ type: 'warning', message: AUTH_ERROR })
      }
    }
  }

  const handleClick = () => {
    navigate(SIGN_IN_URL)
  }

  return (
    <AuthLayout footer={<FooterText text={USE_SIGN_IN_TEXT} subText={USE_SIGN_IN_BUTTON} onClick={handleClick} />}>
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
                  controllerName="firstName"
                  label="Имя"
                  placeholder="Введите имя"
                  required={true}
                />
              </Col>

              <Col span={24}>
                <TextAreaField<SignUp>
                  control={control}
                  controllerName="aboutMe"
                  label="Расскажите о себе"
                  placeholder="Расскажите о себе"
                  required={false}
                  counter={aboutMeLen}
                  maxLength={MAX_ABOUT_ME_LEN}
                />
              </Col>

              <Col span={24}>
                <InputField<SignUp>
                  control={control}
                  controllerName="email"
                  label="Email"
                  placeholder="Введите email"
                  required={true}
                />
              </Col>

              <Col span={24}>
                <InputPasswordField<SignUp>
                  control={control}
                  controllerName="password"
                  label="Пароль"
                  placeholder="Введите пароль"
                  required={true}
                />
              </Col>

              <Col span={24}>
                <InputPasswordField<SignUp>
                  control={control}
                  controllerName="confirmPassword"
                  label="Подтвердите пароль"
                  placeholder="Введите пароль"
                  required={true}
                />
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <SubmitButton>Зарегистрироваться</SubmitButton>
          </Col>
        </Row>
      </form>
    </AuthLayout>
  )
}
