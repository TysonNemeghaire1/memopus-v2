import {Navigate, Outlet} from 'react-router-dom'
import useAuth from "../../hooks/useAuth";

const PrivateRoute = () => {
    const isConnected = useAuth();

    return (
        isConnected ? <Outlet/> : <Navigate to='/login' replace/>
    )
}

export default PrivateRoute;