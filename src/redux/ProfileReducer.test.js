import profileReducer, {addPost, deletePost} from "./ProfileReducer";
import React from "react";

let state = {
    posts: [
        {id: 0, text: 'My first post', likesCount: 123},
        {id: 1, text: 'My second post', likesCount: 58},
        {id: 2, text: 'My third post', likesCount: 42}
    ]
};

test('addPost: length fo posts should be incremented', () => {

    let action = addPost("new post text");
    let newState = profileReducer(state, action);

    expect(newState.posts.length).toBe(4);
});


test('addPost: message of new post successfully added', () => {

    let action = addPost("new post text");
    let newState = profileReducer(state, action);

    expect(newState.posts[3].text).toBe("new post text");
});


test('deletePost: length fo posts should be decrement', () => {

    let action = deletePost(1);
    let newState = profileReducer(state, action);

    expect(newState.posts.length).toBe(2);
});
test(`deletePost: length fo posts shouldn't be decrement if postId is incorrect`, () => {

    let action = deletePost(4);
    let newState = profileReducer(state, action);

    expect(newState.posts.length).toBe(3);
});
