import React, { useEffect, useState, useReducer } from 'react';
import ReactDOM from 'react';
// import helperFunctions from './helper-functions.js';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
//add containers and requirements for JS
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Comments from './pages/Comments.jsx';
import Login from './pages/Login.jsx';
import Profile from './pages/Profile.jsx';

import { UserContext, UserDispatchContext } from './contexts/contexts.jsx';
import {
  userStateReducer,
  userStateInit,
  userStateActions,
} from './reducers/userReducers.jsx';

import styles from './_appStyles.scss';
import './app.scss';

const App = () => {
  //create a High Level state for whether the user is logged in or not
  //make the loggedInStatus either false OR the User's ID/cookie from database as idenfier
  const [userState, userStateDispatch] = useReducer(
    userStateReducer,
    userStateInit,
  );

  useEffect(() => {
    userStateDispatch({ type: userStateActions.CHECK_SESSION });
  }, []);

  useEffect(() => {
    switch (userState.loading) {
      case 'check_session': {
        console.log('checking session...');
        const request = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: '', password: '' }),
        };
        fetch('/api/user/login', request)
          .then(res => res.json())
          .then(data => {
            console.log(data);
            if (data.message === 'Login successful!') {
              userStateDispatch({
                type: userStateActions.LOGIN_SUCCESS,
                payload: data.username,
              });
            } else console.log('No active session');
          })
          .catch(err => {
            console.log('Error locating active session');
          });
        break;
      }
      case 'logout': {
        const request = {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        };
        fetch('/api/user/signout', request)
          .then(res => {
            userStateDispatch({ type: userStateActions.LOGOUT_SUCCESS });
          })
          .catch(err => console.log('unsuccessful logout'));
        break;
      }
    }
  }, [userState.loading]);

  if (userState.loggedIn)
    return (
      <UserContext.Provider value={userState}>
        <UserDispatchContext.Provider value={userStateDispatch}>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route index element={<Home />} />
              <Route path='home' element={<Home />} />
              <Route path='comments/:id' element={<Comments />} />
              <Route path='profile' element={<Profile />} />
            </Routes>
          </BrowserRouter>
        </UserDispatchContext.Provider>
      </UserContext.Provider>
    );
  else
    return (
      <UserContext.Provider value={userState}>
        <UserDispatchContext.Provider value={userStateDispatch}>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Login />} />
              <Route path='*' element={<Navigate to='/' replace={true} />} />
            </Routes>
          </BrowserRouter>
        </UserDispatchContext.Provider>
      </UserContext.Provider>
    );
};

export default App;

// const mdTestString =
// 'Inside the **App** with *markdown*!\n' +
// '\n``` const test = [1,2,3];```\n[reddit](www.reddit.com)';

// return <div>{helperFunctions.md(mdTestString)}</div>;
