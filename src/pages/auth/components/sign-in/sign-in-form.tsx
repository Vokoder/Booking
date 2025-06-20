import { useState } from "react"
import { useForm, type SubmitHandler } from "react-hook-form"
import type { SignIn } from "../form-types"
import { yupResolver } from "@hookform/resolvers/yup"
import { signIn } from "../../../../api/auth/sign-in"
import { Alert, Col, Row, Typography } from "antd"
import { FormField } from "../../../../components/auth/form-field"
import { SubmitButton } from "../../../../components/auth/submit-button"
import { signInSchema } from "./sign-in-validation-schema"
import styles from "./styles.module.css"
import { WarningFilled } from "@ant-design/icons"
import { useUser } from "../../../../api/user/useUser"
import {useNavigate} from "react-router"
import { DEFAULT_URL } from "../../../../app/constants"

const { Title } = Typography

export const SignInForm = () => {
    const { logIn } = useUser()
    const navigate = useNavigate()

    const {
        handleSubmit,
        control,
        setError,
    } = useForm<SignIn>({
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
        } catch (e) {
            setError("email", {})
            setError("password", {})
            if (e instanceof Error) {
                setIsInvalidCredentials(true)
            } else {
                alert(`Произошла неизвестная ошибка: ${e}`)
            }
        }
    }

    return (<form onSubmit={handleSubmit(onSubmit)}>
        <Row gutter={[0, 32]}>
            <Col span={24}>
                <Title
                    level={4}
                >
                    Добро пожаловать!
                </Title>
            </Col>
            {
                isInvalidCredentials && (
                    <Col span={24}>
                        <Alert
                            message="Неверный логин или пароль"
                            type="error"
                            className={styles.alert}
                            icon={
                                <WarningFilled className={styles.alertIcon} />
                            }
                            showIcon
                        />
                    </Col>
                )
            }
            <Col span={24}>
                <Row gutter={[0, 16]}>
                    <Col span={24}>
                        <FormField<SignIn>
                            control={control}
                            controllerName='email'
                            label='Email'
                            placeholder='Введите email'
                            required={true}
                            type="input"
                        />
                    </Col>

                    <Col span={24}>
                        <FormField<SignIn>
                            control={control}
                            controllerName='password'
                            label='Пароль'
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
                    Авторизоваться
                </SubmitButton>
            </Col>
        </Row>
    </form>)
}