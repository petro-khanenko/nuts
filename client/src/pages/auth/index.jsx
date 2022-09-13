import React, {useState} from 'react'
import {Redirect} from "react-router-dom"
import {useHttp} from "../../hooks/http.hook"
import {useAuth} from "../../hooks/auth.hook"
import {setInfoModal} from "../../utils/swal/helpers";
import {apiRoutes, apiSubRoutes, mainRoutes, subRoutes} from "../../constants/constants";


const Auth = () => {
    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const {request} = useHttp();
    const {login, token} = useAuth();

    const formHandler = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    }

    const registerHandler = async () => {
        try {
            await request(`/${apiRoutes.AUTH}/${apiSubRoutes.REGISTER}`, 'POST', {...form});
            setInfoModal('Вітаємо. Реєстрація пройшла успішно !!!')
        } catch (e) {
            const text = e.message && e.status === 'failed' ? e.message : 'На жаль сталася помилка. Спробуйте ще раз.';
            setInfoModal(text, 'warning');
        }
    }

    const loginHandler = async () => {
        try {
            const data = await request(`/${apiRoutes.AUTH}/${apiSubRoutes.LOGIN}`, 'POST', {...form});
            login(data.token, data.adminId);
        } catch (e) {
            const text = e.message && e.status === 'failed' ? e.message : 'На жаль сталася помилка. Спробуйте ще раз.';
            setInfoModal(text, 'warning');
        }
    }

    if (token) {
        return <Redirect to={`/${mainRoutes.ADMIN}/${subRoutes.PANEL}`}/>
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
    );
}

export default Auth;
