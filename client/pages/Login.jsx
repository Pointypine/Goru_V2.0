import React, { useEffect, useState, useContext } from 'react';
import ReactDOM from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
//add containers and requirements for JS

import { UserDispatchContext, UserContext } from '../contexts/contexts.jsx';
import { userStateActions } from '../reducers/userReducers.jsx';

const Login = props => {
  //create a state of invalid usernmae/passowrd initialixed to false
  const [invalidLogin, setShowInvalidLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const userDispatch = useContext(UserDispatchContext);
  const userState = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogin = async e => {
    e.preventDefault();
    if (username === '' || password === '') return;
    userDispatch({ type: userStateActions.LOGIN });
  };

  useEffect(() => {
    switch (userState.loading) {
      case 'login': {
        console.log('attempting login');
        const request = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        };
        fetch('/api/user/login', request)
          .then(res => res.json())
          .then(data => {
            console.log(data);
            if (data.message !== 'Login successful!') {
              setShowInvalidLogin(true);
            } else {
              userDispatch({
                type: userStateActions.LOGIN_SUCCESS,
                payload: { username, id: data.id },
              });
            }
            setUsername('');
            setPassword('');
          });
        break;
      }

      default:
        break;
    }
  }, [userState.loading]);

  return (
    <div className='wrapper'>
      <div className='body2'>
        {userState.newUser && <h3>New user successfully created!</h3>}
        <div className='form_contents'>
          <div className='login_form_container'>
            <form className='login_form'>
              <div className='usernameLogin'>
                <label>Username</label>
                <input
                  type='text'
                  className='login_username'
                  placeholder='Username'
                  onInput={e => {
                    setUsername(e.target.value);
                  }}
                  value={username}></input>
              </div>
              <div className='passwordLogin'>
                <label>Password</label>
                <input
                  type='password'
                  className='login_password'
                  placeholder='Password'
                  value={password}
                  onInput={e => {
                    setPassword(e.target.value);
                  }}></input>
              </div>
              {invalidLogin && (
                <div className='invalid_login'>
                  Invalid Username Or Password
                </div>
              )}
              <div className='submit_button_box'>
                <button
                  className='form_submit_button'
                  value='Submit'
                  onClick={e => {
                    handleLogin(e);
                  }}>
                  Login
                </button>
              </div>
            </form>
          </div>
          <div className='response_button'>
            <label>New User?</label>
            <button
              onClick={() => {
                navigate('/signup');
              }}>
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

/* 

const [UN, setUN] = setState('')

const handleLogin = async () => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: UN, password: PW }),      <-
      });
      console.log(response);
      const data = response.json();
      if (response.ok) {
        console.log('Frontend Login successful');
        setIsLoggedIn(true);
      } else {
        console.log('Frontend Login unsuccesful');
        setIncorrect('Incorrect combination. Try again.');
      }
    } catch (err) {
      console.error('Error in Frontend Login');
    }
  };



  HTML:
  <Button onClick={() => handleLogin())}>

  <input 
  type='text' 
  className='login_username' 
  placeholder='Username' 
  onChange={(e) => setPW(e.target.value)
  ></input>



  function mergedFunction() {
    const username = dummy.innerhtml
    setUN(username)
    handleLogin()
  }


  <Button classname='dummy' onClick={mergedFunction}>

*/
