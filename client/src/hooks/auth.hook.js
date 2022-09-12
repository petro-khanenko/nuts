import {useCallback, useEffect, useState} from "react";
import {localStorageKeys} from "../constants/constants";

export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [adminId, setAdminId] = useState(null);
    const [ready, setReady] = useState(false);

    const login = useCallback((jwtToken, id) => {
        setToken(jwtToken);
        setAdminId(id);
        localStorage.setItem(localStorageKeys.AUTH_DATA, JSON.stringify({
            token: jwtToken, adminId: id
        }));
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setAdminId(null);
        localStorage.removeItem(localStorageKeys.AUTH_DATA);
    }, []);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(localStorageKeys.AUTH_DATA));
        if (data && data.token) {
            login(data.token, data.adminId);
        }
        setReady(true);
    }, [login, token]);

    return { login, logout, token, adminId, ready }
}