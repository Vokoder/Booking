import RequiredIndicator from './RequiredIndicator.tsx'
import { Typography } from 'antd'

const { Title } = Typography

const FormInputName = (props: any) => {
    return <Title level={5} className='formInputName'>
        {props.name}
        {props.required && <> <RequiredIndicator /></>}
    </Title>
}

export default FormInputName