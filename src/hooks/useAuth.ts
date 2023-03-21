import {useEffect, useState} from "react";
import Coopernet from "../services/Coopernet";

export default function useAuth() {
    const [isConnected, setIsConnected] = useState(true);

    useEffect(() => {
        (() => {
            setIsConnected(!!Coopernet.user.id);
        })()
    }, []);
    return isConnected;
}