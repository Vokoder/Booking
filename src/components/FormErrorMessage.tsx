import { Typography } from 'antd'

const { Text } = Typography

const Message = (props:any) => {
    return (
        props.message && (
            <Text type='danger' className='formError'>
                {props.message}
            </Text>
        )
    )
}

export default Message