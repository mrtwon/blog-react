import React, {useEffect, useState} from 'react'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { useAppSelector } from '../hooks';
export const NotificationComponent = () => {
    /*
        error state -> container-notification-error-state
        ok state -> container-notification-ok-state
    */
   const {ok, message, uid} = useAppSelector(store => store.notificationReducer)
   const addedClass = ok ? 'container-notification-ok-state' : 'container-notification-error-state'
   const [isShow, setShow] = useState(false)
   const [opacityValue, setOpacityValue] = useState(0)
   useEffect(()=>{
    startOpacityChange()
   },[uid])
   const startOpacityChange = async () => {
      console.log('startOpacityChange')
      setOpacityValue(1)
      await sleep(3000)
      setOpacityValue(0)
      await sleep(2000)
   }
   function sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    return(
        <div className="wrapper-container-notification">
            <div className={`container-notification ${addedClass}`} style={{opacity: opacityValue}}>
                <NotificationsActiveIcon style={{color: 'white'}} />
                <div className='container-notification-p-info'>
                    <p>{message}</p>
                </div>
            </div>
        </div>
    )
}