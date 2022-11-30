import React, {useEffect, useState} from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import CloseIcon from '@mui/icons-material/Close';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import { Post, PostItem } from '../types/PostItem';
import { useAppDispatch, useAppSelector } from '../hooks';
import { likePost, removePost, unLikePost, updatePost } from '../store/postsReducer';

interface InterfacePostComponent extends PostItem{

}
export const PostComponent = (input: InterfacePostComponent) => {
    const dispatch = useAppDispatch()
    const currentPost = input.post
    const {id, userId, body, title} = currentPost
    const {login} = input.user
    const likes = input.likes
    const currentUserId = useAppSelector(store => store.profileReducer).currentUser?.id
    const [isEdit, setEdit] = useState(false)
    const [editTitle, setEditTitle] = useState(title)
    const [editBody, setEditBody] = useState(body)
    const isLiked = () => {
      let index = likes.findIndex(item => item.userId === currentUserId)
      return index !== -1
    }
    const isAuthor = () => {
       return currentUserId === userId
    }
    let likedStyle = isLiked() ? {color: 'green'} : {color: 'blue'}
    const onClickEdit = () => {
      setEdit(!isEdit)
      if(!isEdit){
        setEditTitle(title)
        setEditBody(body)
      }
    }
    const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
      setEditTitle(event.target.value)
    }
    const onChangeBody = (event: React.ChangeEvent<HTMLInputElement>) => {
      setEditBody(event.target.value)
    }
    const onLikeAction = () => {
      if(isLiked()){
        dispatch(unLikePost(currentPost))
      }else{
        dispatch(likePost(currentPost))
      }
    }
    const onClickDeletePost = () => {
       dispatch(removePost(id))
    }
    const onClickUpdatePost = () => {
      if(editTitle && editBody){
        let copyObjectPost = {} as Post
        Object.assign(copyObjectPost, input.post)
        copyObjectPost.title = editTitle
        copyObjectPost.body = editBody
        dispatch(updatePost(copyObjectPost))
        setEdit(!isEdit)
      } 
    }
    return (
        <div>
            <Card sx={{ width: '460px' }}>
        <CardActions>
            <div className='post-div-close'>
            
            {
              isEdit ?
              <>
              <Button size='small' variant='text' style={{color: 'red'}} onClick={onClickEdit}>отменить</Button>
              <Button size='small' variant='text' style={{color: 'green'}} onClick={onClickUpdatePost}>применить</Button>
              </>
              : null
            }
            {
              !isEdit && currentUserId == userId
                ? <Button size='small' variant="outlined" onClick={onClickEdit}><EditIcon style={{color: 'black'}}/></Button>
                : null
            }
            {
              isAuthor()
                ? <Button size="small" variant="outlined" onClick={onClickDeletePost}><CloseIcon sx={{ color: 'red' }}/></Button>
                : null
            }
            </div>
        </CardActions>
        <CardContent>
          {
            !isEdit
            ? <>
              <Typography gutterBottom variant="h5" component="div">
                  {title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {body}
              </Typography>
            </>
            : null
          }
            {
            
             isEdit ? <>
              <div className='post-div-wrapper-tf'>
              <TextField
                  className='post-div-container-tf-element'
                  id="filled-multiline-flexible"
                  label="Title"
                  multiline
                  maxRows={4}
                  variant="filled"
                  value={editTitle}
                  onChange={onChangeTitle}
              />
              <TextField
                  className='post-div-container-tf-element'
                  id="filled-multiline-flexible"
                  label="Post"
                  multiline
                  maxRows={6}
                  variant="filled"
                  value={editBody}
                  onChange={onChangeBody}
              />
              </div>
              </>
              : null
            }
        </CardContent>
        <CardActions>
            <div className='post-div-like'>
                <Button variant="outlined">{login}</Button>
                <Button size="small" onClick={onLikeAction}><ThumbUpIcon style={likedStyle} /></Button>
                <h3>{likes.length}</h3>
            </div>
        </CardActions>
      </Card>
        </div>
    )
}