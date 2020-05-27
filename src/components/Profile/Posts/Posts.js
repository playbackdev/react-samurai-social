import React from "react";
import classes from './Posts.module.scss'
import Post from "./Post/Post";
import AddPostForm from "./Post/AddPostForm";
import {reset} from 'redux-form';


const Posts = (props) => {

    const addPostHandler = (formData, dispatch) => {
        props.addPost(formData.newPostText);
        dispatch(reset('AddPostProfile'));
    };

    return (
        <div className={classes.Posts}>
            <div className={classes.newPost}>
                <AddPostForm onSubmit={addPostHandler}/>
            </div>
            {
                props.posts.map(p => <Post key={p.id} id={p.id} message={p.text} likesCount={p.likesCount}/>)
            }
        </div>

    );
};

export default Posts;