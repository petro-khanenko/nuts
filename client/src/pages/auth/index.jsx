import React, {useState} from 'react'
import {Redirect} from "react-router-dom"
import {useHttp} from "../../hooks/http.hook"
import {useAuth} from "../../hooks/auth.hook"
import {setInfoModal} from "../../utils/swal/helpers";
import {apiRoutes, apiSubRoutes, mainRoutes, subRoutes} from "../../constants/constants";
import styled from '@emotion/styled'
import {Container, TextField} from "@mui/material";
import {Button} from "@material-ui/core";

// styled components
const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2% auto;
  padding-bottom: 25px;
  background-color: #e1f1f1;
`;
const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 25px;
`;
const StyledButton = styled(Button)`
  padding: 10px;
  font-size: 1rem;
  width: 48%;
`;

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
        <StyledContainer container={'main'} maxWidth={'sm'}>
            <h2>Login</h2>
            <TextField variant='outlined'
                       margin='normal'
                       fullWidth
                       label='Email'
                       id='email'
                       name='email'
                       value={form.email}
                       onChange={formHandler}
            />
            <TextField variant='outlined'
                       margin='normal'
                       fullWidth
                       label='Password'
                       id='email'
                       name='email'
                       type='password'
                       value={form.password}
                       onChange={formHandler}
            />
            <ButtonsContainer>
                <StyledButton
                    variant='contained'
                    color='primary'
                    onClick={loginHandler}
                >
                    Увійти
                </StyledButton>
                <StyledButton
                    variant='contained'
                    color='secondary'
                    onClick={registerHandler}
                >
                    Зареєструватися
                </StyledButton>
            </ButtonsContainer>
        </StyledContainer>
    );
}

export default Auth;
