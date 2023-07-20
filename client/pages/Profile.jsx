import React, { useEffect, useState, useContext } from 'react';
import ReactDOM from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import parse from 'html-react-parser';
//add containers and requirements for JS
import { UserContext, UserDispatchContext } from '../contexts/contexts.jsx';
import { userStateActions as actions } from '../reducers/userReducers.jsx';

const Comment = ({ comment }) => {
  console.log(comment);
  return (
    <div style={{ border: '1px dotted black' }}>
      <p>
        <em>Comment title:</em> {comment.title}
      </p>
      <p>
        <em>Tech number: </em>
        {comment.tech}
      </p>
      <div>
        <em>Contents:</em>
        <div style={{ 'margin-left': '1em' }}>{parse(comment.comment)}</div>
      </div>
    </div>
  );
};

const Profile = props => {
  const userState = useContext(UserContext);
  const userDispatch = useContext(UserDispatchContext);

  useEffect(() => {
    // on load-in, we want to pull user's recent comment history from db
    const request = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    fetch(`/api/user/${userState.username}`, request)
      .then(res => {
        return res.json();
      })
      .then(data => {
        userDispatch({
          type: actions.USER_COMMENTS_RECEIVED,
          payload: data.posts,
        });
      });
  }, []);

  if (userState.loggedIn) {
    const userCommentsDisplay = [];
    for (let i = 0; i < userState.comments.length; i++) {
      userCommentsDisplay.push(
        <Comment comment={userState.comments[i]} key={i} />,
      );
    }
    return (
      <div className='wrapper'>
        <div className='body'>
          <div className='profile_picture'>
            Picture
            <div className='profile_image'>FETCHED image here</div>
          </div>
          <div className='profile_name'>
            Name
            <div className='profile_text'>{userState.username}</div>
          </div>
          <div className='profile_password'>
            Password
            <div className='profile_pass'>FETCHED pasword here</div>
          </div>
          <div className='profile_friends'>
            Friends List
            <div className='profile_friends_list'>FETCHED Your Friends</div>
          </div>
          <div className='profile_comments'>
            Recent Comments
            <div className='profile_comments_list'>{userCommentsDisplay}</div>
          </div>
          <div className='profile_apis'>
            Recent API's Added
            <div className='profile_APIs_list'>FETCHED Your recent api's</div>
          </div>
          <div>
            <button
              className='button'
              onClick={() => {
                userDispatch({ type: actions.LOGOUT });
              }}>
              * LOG OUT *
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    //--> User is not signed in, give generic Profile display
    return (
      <div className='wrapper'>
        <div className='body'>
          <div className='profile_picture'>
            Picture
            <div className='profile_image'>Uploads image here</div>
          </div>
          <div className='profile_name'>
            Name
            <div className='profile_text'>Edit name form here</div>
          </div>
          <div className='profile_password'>
            Password
            <div className='profile_pass'>Edit pasword form here</div>
          </div>
          <div className='profile_friends'>
            Friends List
            <div className='profile_friends_list'>Your Friends</div>
          </div>
          <div className='profile_comments'>
            Recent Comments
            <div className='profile_comments_list'>
              Your recent comments on other APIs
            </div>
          </div>
          <div className='profile_apis'>
            Recent API's Added
            <div className='profile_APIs_list'>Your recent api's</div>
          </div>
        </div>
      </div>
    );
  }
};

export default Profile;
