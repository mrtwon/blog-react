import { useEffect, useState } from "react"
import { Outlet, Navigate, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../hooks"
import { checkLogin } from "../store/profileReducer"
import { LoginComponent } from "./LoginComponent"
import { RegistrationComponent } from "./RegistrationComponent"

export let RedirectComponent = () => {
    const {currentUser} = useAppSelector(store => store.profileReducer)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    console.log('current user update - '+currentUser)
    useEffect(()=>{
        console.log('useEffect[]')
        dispatch(checkLogin())
    },[])
    if(currentUser){
        return(
            <>
                <Outlet/>
            </>
        )
    }else{
        navigate('/login', {state: {redirectTo: '/dashboard'}})
        return <></>
    }
}