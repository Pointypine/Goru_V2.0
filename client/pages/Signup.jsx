import React, { useEffect, useState, useContext } from 'react';
import ReactDOM from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: stretch;
  align-content: space-around;
  gap: 1em;
`;

const Signup = () => {
  return (
    <PageContainer>
      <Container >
        <input type="text" />
        <input type="text" />
      <Container />
        <button>Sign Up</button>
      <Container >
      <Container />
    </PageContainer>
  );
};

export default Signup;
