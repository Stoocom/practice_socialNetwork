import profileReducer, { addPostActionCreator, deletePost } from "./profileReducer";
import React from "react"
import { act } from "react-dom/test-utils";

let action = addPostActionCreator("frontend");
    let state = {
        posts: [
            { id: 1, message: 'Hello people!', countLikes: '15' },
            { id: 2, message: "I'm hunter", countLikes: '20' },
            { id: 3, message: "I'll stay good programmer", countLikes: '15' },
        ]
    };
    let newState = profileReducer(state, action); 

it('length should be more', () => {
    let action = addPostActionCreator("frontend");
    let state = {
        posts: [
            { id: 1, message: 'Hello people!', countLikes: '15' },
            { id: 2, message: "I'm hunter", countLikes: '20' },
            { id: 3, message: "I'll stay good programmer", countLikes: '15' },
        ]
    };
    let newState = profileReducer(state, action); 
    expect(newState.posts.length).toBe(4);
});  

it('message is alright', () => {

    expect(newState.posts[3].message).toBe("frontend");
});

it('after deleting length of messages should be decrement', () => {
    let action = deletePost(1);
    
    let newState = profileReducer(state, action); 

    expect(newState.posts.length).toBe(2);
}); 