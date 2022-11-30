import React, {useState, useEffect} from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { clearLogin, login } from '../store/loginReducer';
import { test } from '../store/notificationReducer';
export const LoginComponent = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const {ok, error}= useAppSelector(store => store.loginReducer)
    const dispatch = useAppDispatch()
    const [fieldLogin, setLogin] = useState('')
    const [fieldPassword, setPassword] = useState('')

    const onChangeLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLogin(event.target.value)
    }
    const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }
    const onClickButton = () => {
        if(fieldLogin && fieldPassword){
            dispatch(login({login: fieldLogin, password: fieldPassword}))
        }
    }
    useEffect(()=>{
        if(ok){
            console.log(location)
            let redirectTo = location.state?.redirectTo
            if(redirectTo !== undefined){
                navigate(redirectTo)
            }else{
                navigate('/dashboard')
            }
            console.log('ok')
        }
    },[ok])
    useEffect(()=>{
        console.log(location)
        return ()=>{
            dispatch(clearLogin())
        }
    },[])

    return(
        <div className='main-center-container'>
            <div className="container-login">
                
                <div className='container-login-block-info-login'>
                    <p className='container-login-p-login'>Авторизация</p>
                    {
                       error
                       ? <p className='container-login-p-info container-login-p-info-state-error'>{error}</p>
                       : null
                    }
                </div>



                <div className='container-login-block-textinput'>
                 <TextField
                    className='login-textfield'
                    id="standard-basic"
                    label="login"
                    variant="standard"
                    onChange={onChangeLogin}
                 />
                 <TextField
                    id="standard-basic"
                    variant="standard"
                    label="password"
                    onChange={onChangePassword}
                 />
                </div>


                <div className='container-login-block-buttons'>
                    <Button
                        className='container-login-btn-login'
                        variant="contained"
                        color="success"
                        onClick={onClickButton}
                        >ВОЙТИ</Button>
                    <Button size="small" variant="text" className='container-login-p-registr'>
                        <Link to='/registration'>Регестрация</Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}