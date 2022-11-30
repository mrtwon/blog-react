import { CreatePostComponent } from "./CreatePostComponent"
import { HeaderComponent } from "./HeaderComponent"
import { PostListComponent } from "./PostListComponent"

export const DashboardComponent = () => {
    return (
        <>
            <HeaderComponent/>
            <div className='dashboard-container'>
            <CreatePostComponent/>
            <PostListComponent/>
            </div>
        </>
    )
}