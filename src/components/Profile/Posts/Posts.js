import React from "react";
import classes from './Posts.module.scss'
import Post from "./Post/Post";
import AddPostForm from "./Post/AddPostForm";
import {reset, SubmissionError} from 'redux-form';


const Posts = (props) => {

    const addPostHandler = (formData, dispatch) => {
        //submit validation
        if (!formData.newPostText || formData.newPostText.length === 0) {
            throw new SubmissionError({
                newPostText: 'Message can\'t be empty',
                _error: 'Request failed'
            });
        } else if (formData.newPostText && formData.newPostText.length > 140) {
            throw new SubmissionError({
                newPostText: 'Message can\'t be more than 140 chars',
                _error: 'Request failed'
            });
        }
        props.addPost(formData.newPostText);
        dispatch(reset('AddPostProfile'));
    };

    return (
        <div className={classes.Posts}>
            <div className={classes.newPost}>
                <AddPostForm onSubmit={addPostHandler}/>
            </div>
            {
                [...props.posts].reverse().map(p => <Post key={p.id} id={p.id} message={p.text} likesCount={p.likesCount}/>)
            }
        </div>

    );
};

export default Posts;