import React from "react";
import classes from './Posts.module.scss'
import Post from "./Post/Post";


const Posts = (props) => {

    const textAreaEl = React.createRef();

    const addPostHandler = (e) => {
        e.preventDefault();
        if(textAreaEl.current.value === '') return 0;
        props.addPostHandler();
    };

    const postTextChangeHandler = () => {
        props.postTextChangeHandler(textAreaEl.current.value);
    };

    return (
        <div className={classes.Posts}>
            <div className={classes.newPost}>
                <form onSubmit={addPostHandler}>
                    <textarea
                        ref={textAreaEl}
                        value={props.newPostText}
                        onChange={postTextChangeHandler}
                        placeholder="Write your new post..."
                    />
                    <button>Add post</button>
                </form>
            </div>
            {
                props.posts.map(p => <Post key={p.id} id={p.id} message={p.text} likesCount={p.likesCount}/>)
            }
        </div>

    );
};

export default Posts;