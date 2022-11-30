import React, {useState, useEffect} from 'react' 
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import { useAppDispatch, useAppSelector } from '../hooks';
import { createPost } from '../store/postsReducer';
export const CreatePostComponent = () => {
    const dispatch = useAppDispatch()
    const {ok, error, uid} = useAppSelector(store => store.createPostReducer)
    const {currentUser} = useAppSelector(store => store.profileReducer)
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')


    const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value)
    }
    const onChangeBody = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBody(event.target.value)
    }

    const onClickSend = () => {
        if(title && body){
            dispatch(createPost({title: title, body: body}))
        }
    }

    useEffect(()=>{
        if(ok){
            setTitle('')
            setBody('')
        }
    },[uid])

    return (
            <div className="container-create-post">
                {
                    error
                    ? <p className='container-create-post-errorInfo'>{error}</p>
                    : null
                }
                <div className='container-create-post-textFields'>
                    <TextField
                        className='container-create-post-tf-title'
                        id="standard-basic"
                        label="Title"
                        variant="standard"
                        value={title}
                        onChange={onChangeTitle}
                    />
                    <TextField
                        className='container-create-post-tf-post'
                        id="outlined-multiline-static"
                        label="Your post"
                        variant="outlined"
                        multiline
                        rows={4}
                        value={body}
                        onChange={onChangeBody}
                    />
                </div>
                <div className='container-create-post-buttons'>
                    {
                        currentUser?.name ?
                        <Button variant="outlined">
                            <p className='container-create-post-p-avtor'>Автор:
                                <span className='container-create-post-span-avtor'>{currentUser.name}</span>
                            </p>
                        </Button>
                        : null
                    }
                    <Button color='success' variant="contained" onClick={onClickSend}>ОПУБЛИКРОВАТЬ</Button>
                </div>
            </div>
    )
}