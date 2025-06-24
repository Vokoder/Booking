import { useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import type { SignIn } from '@/pages/auth/components/form.types'
import { yupResolver } from '@hookform/resolvers/yup'
import { signIn } from '@api/auth'
import { Alert, Col, Row, Typography } from 'antd'
import { SubmitButton } from '@/components/form/submit-button'
import { signInSchema } from '@pages/auth/components/sign-in'
import styles from '@pages/auth/components/sign-in/sign-in-form.module.css'
import { WarningFilled } from '@ant-design/icons'
import { useUser } from '@/app/auth'
import { useNavigate } from 'react-router'
import { DEFAULT_URL, SIGN_UP_URL } from '@constants/routes'
import { FirebaseError } from 'firebase/app'
import { AUTH_INVALID_CREDENTIAL } from '@/constants/error-codes'
import { AuthLayout } from '@pages/auth/auth-layout'
import { Footer } from '@pages/auth/components/footer'
import { USE_SIGN_UP_TEXT, USE_SIGN_UP_BUTTON, AUTH_ERROR } from '@pages/auth/components/sign-in'
import { InputField, InputPasswordField } from '@/components/form/input-field'
import { INVALID_CREDENTIAL } from '@/constants/validation'
import { useAlert } from '@/app/alert'

const { Title } = Typography

export const SignInForm = () => {
  const { logIn } = useUser()
  const navigate = useNavigate()
  const { showAlert, hideAlert } = useAlert()

  const { handleSubmit, control, setError } = useForm<SignIn>({
    mode: 'onSubmit',
    resolver: yupResolver(signInSchema),
  })
  const [isInvalidCredentials, setIsInvalidCredentials] = useState(false)

  const onSubmit: SubmitHandler<SignIn> = async (data) => {
    try {
      const userData = await signIn(data)
      await logIn(userData)
      setIsInvalidCredentials(false)
      navigate(DEFAULT_URL)
      hideAlert()
    } catch (e) {
      if (e instanceof FirebaseError) {
        if (e.code === AUTH_INVALID_CREDENTIAL) {
          setError('email', {})
          setError('password', {})
          setIsInvalidCredentials(true)
        } else {
          showAlert({ type: 'warning', message: AUTH_ERROR })
        }
      } else {
        showAlert({ type: 'warning', message: AUTH_ERROR })
      }
    }
  }

  const handleClick = () => {
    navigate(SIGN_UP_URL)
  }

  return (
    <AuthLayout footer={<Footer text={USE_SIGN_UP_TEXT} subText={USE_SIGN_UP_BUTTON} onClick={handleClick} />}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row gutter={[0, 32]}>
          <Col span={24}>
            <Title level={4}>Добро пожаловать!</Title>
          </Col>
          {isInvalidCredentials && (
            <Col span={24}>
              <Alert
                message={INVALID_CREDENTIAL}
                type="error"
                className={styles.alert}
                icon={<WarningFilled className={styles.alertIcon} />}
                showIcon
              />
            </Col>
          )}
          <Col span={24}>
            <Row gutter={[0, 16]}>
              <Col span={24}>
                <InputField<SignIn>
                  control={control}
                  controllerName="email"
                  label="Email"
                  placeholder="Введите email"
                  required={true}
                  type="input"
                />
              </Col>

              <Col span={24}>
                <InputPasswordField<SignIn>
                  control={control}
                  controllerName="password"
                  label="Пароль"
                  placeholder="Введите пароль"
                  required={true}
                  isPassword={true}
                  type="input"
                />
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <SubmitButton>Авторизоваться</SubmitButton>
          </Col>
        </Row>
      </form>
    </AuthLayout>
  )
}
