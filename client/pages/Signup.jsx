import React, { useEffect, useState, useContext } from 'react';
import ReactDOM from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
//add containers and requirements for JS

import styled from 'styled-components';

import { UserDispatchContext, UserContext } from '../contexts/contexts.jsx';
import { userStateActions } from '../reducers/userReducers.jsx';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: stretch;
  margin: 2em;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: stretch;
  align-content: space-around;
  gap: 0.1em;
`;

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [usernameTaken, setUsernameTaken] = useState(false);
  const navigate = useNavigate();

  const dispatch = useContext(UserDispatchContext);

  const handleClick = e => {
    e.preventDefault();
    setUsernameTaken(false);
    if (isLoading || password === '' || username === '') return;
    setIsLoading(true);
  };

  useEffect(() => {
    if (!isLoading) return;
    console.log('Sending make user request...');
    const request = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        password,
        contact: email,
      }),
    };
    fetch('/api/user/newUser', request)
      .then(res => {
        if (res.status === 200) {
          setIsLoading(false);
          dispatch({ type: userStateActions.NEW_USER });
          navigate('/');
        } else return res.json();
      })
      .then(data => {
        if (!data) return;
        if (data.message === 'Username taken') {
          setUsernameTaken(true);
        }
      });
  }, [isLoading]);

  return (
    <PageContainer>
      <Container>
        <h1>Sign up</h1>
      </Container>
      <Container>
        <input
          type='text'
          placeholder='Username'
          value={username}
          onInput={e => {
            setUsername(e.target.value);
          }}
        />
        <input
          type='password'
          placeholder='Password'
          value={password}
          onInput={e => {
            setPassword(e.target.value);
          }}
        />
      </Container>
      <Container>
        <button onClick={handleClick}>Sign Up</button>
      </Container>
      {usernameTaken && <p>Username taken. Try a different username.</p>}
    </PageContainer>
  );
};

export default Signup;
