import {useCallback, useEffect, useState} from "react"

const AUTH_DATA = 'AUTH_DATA'
export const useAuth = () => {

    const [token, setToken] = useState()
    const [adminId, setAdminId] = useState()
    const [ready, setReady] = useState(false)

    const login = useCallback((jwtToken, id) => {
        setToken(jwtToken)
        setAdminId(id)

        localStorage.setItem(AUTH_DATA, JSON.stringify({
            token: jwtToken, adminId: id
        }))
    }, [])

    const logout = useCallback(() => {
        setToken(null)
        setAdminId(null)

        localStorage.removeItem(AUTH_DATA)
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(AUTH_DATA))
        if (data && data.token) {
            login(data.token, data.adminId)
        }
        setReady(true)
    }, [login, token])

    return { login, logout, token, adminId, ready }
}