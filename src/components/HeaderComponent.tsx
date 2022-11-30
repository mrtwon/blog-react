import { useAppDispatch, useAppSelector } from "../hooks"
import Button from '@mui/material/Button';
import { logout } from "../store/profileReducer";
export const HeaderComponent = () => {
    const {currentUser} = useAppSelector(store => store.profileReducer)
    const dispatch = useAppDispatch()
    const onClickLogout = () => {
        dispatch(logout())
    }
    return (
        <div className="header">
            <p className='logo-label'>Blog</p>
            <p>Вы вошли как <span>{currentUser?.login}</span></p>
            <div onClick={onClickLogout} className='header-button-logout'><p>ВЫЙТИ</p></div>
        </div>
    )
}