import {Navigate, Outlet} from 'react-router-dom'

interface PrivateRoutesProps {
    isConnected: boolean
}

const PrivateRoutes = ({isConnected}: PrivateRoutesProps) => {

    return (
        isConnected ? <Outlet/> : <Navigate to='/login'/>
    )
}

export default PrivateRoutes;