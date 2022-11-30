import React, {useState, useEffect} from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import {Link, Navigate} from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks';
import { SrvRecord } from 'dns';
import { UserContent } from '../types/PostItem';
import { clearRegistration, registration } from '../store/registrationReducer';
import useEnhancedEffect from '@mui/material/utils/useEnhancedEffect';
export const RegistrationComponent = () => {
    const {ok, error} = useAppSelector(store => store.registrationReducer)
    const dispatch = useAppDispatch()
    const [name, setName] = useState('')
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    /*
        state for info:
        ok - container-login-p-info-state-ok
        error - container-login-p-info-state-error
    */
   const sendRegistrationData = () => {
        if(name && login && password){
            dispatch(registration({
                name: name,
                login: login,
                password: password
            }))
        }
   }

    const onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
    }
    const onChangeLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLogin(event.target.value)
    }
    const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }
    
    useEffect(()=>{
        return ()=>{
            console.log('clear')
            dispatch(clearRegistration())
        }
    },[])

    if(ok){
        return <Navigate to='/login'/>
    }

    return(
        <div className='main-center-container'>
            <div className="container-login">
                <div className='container-login-block-info-login'>
                    <p className='container-login-p-login'>Регестрация</p>
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
                    label="name"
                    variant="standard"
                    onChange={onChangeName}
                 />
                 <TextField
                    id="standard-basic"
                    variant="standard"
                    label="login"
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
                        onClick={sendRegistrationData}
                        >ЗАРЕГЕСТРИРОВАТСЯ
                        </Button>
                    <Button size="small" variant="text" className='container-login-p-registr'>
                        <Link to='/login'>войти</Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}