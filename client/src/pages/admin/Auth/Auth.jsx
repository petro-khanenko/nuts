import React, {useState} from 'react'
import {useHttp} from "../../../hooks/http.hook"
import {useAuth} from "../../../hooks/auth.hook"
import {Redirect} from "react-router-dom"

const Auth = () => {

    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const {request} = useHttp()
    const {login, token} = useAuth()

    const formHandler = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            console.log(data)
        } catch (e) {
        }
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            console.log(data)
            login(data.token, data.adminId)
        } catch (e) {
        }
    }

    if (token) {
        return <Redirect to={'/admin/panel'}/>
    }

    return (
        <div>
            <div className={'admin-panel'}>
                <h1>Login</h1>
                <input placeholder="Enter Your email"
                       id="email"
                       type="email"
                       name={"email"}
                       value={form.email}
                       onChange={formHandler}
                />
                <input placeholder="Enter Your password"
                       id="password"
                       type="password"
                       name={"password"}
                       value={form.password}
                       onChange={formHandler}
                />
                <div>
                    <button onClick={loginHandler}>Login</button>
                    <button disabled={false} onClick={registerHandler}>Register</button>
                </div>
            </div>
        </div>
    )
}


export default Auth
