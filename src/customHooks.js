import { useSelector } from 'react-redux'

export const useUser = () => {
    const userType = useSelector(state => state.user.type)
    const userName = useSelector(state => state.user.name)

    return [ userType === 'admin', `${userType}/${userName}`, userName, userType ]
}