import { Outlet } from "react-router-dom"
import { NotificationComponent } from "./NotificationComponent"

export const GlobalComponent = () => {
    return(
        <>
        <Outlet/>
        <NotificationComponent/>
        </>
    )
}