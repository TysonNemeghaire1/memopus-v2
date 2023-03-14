import {Navigate, Outlet} from 'react-router-dom'
import Coopernet from "../../services/Coopernet";
import {useEffect, useState} from "react";

const PrivateRoutes = () => {

    const [isConnected, setIsConnected] = useState(false)

    useEffect(() => {

        (async () => {
            setIsConnected(Boolean(await Coopernet.setOAuthToken()))
        })()

    }, [])

    return (
        isConnected ? <Outlet/> : <Navigate to='/login'/>
    )
}

export default PrivateRoutes;