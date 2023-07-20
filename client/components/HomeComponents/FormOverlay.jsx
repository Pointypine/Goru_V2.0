import React, { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  StateContext as OverlayFormContext,
  DispatchContext as OverlayDispatchContext,
} from '../../contexts/contexts.jsx';

import { homePageActions as actions } from '../../reducers/homePageReducers.jsx';

const FormOverlay = () => {
  const dispatch = useContext(OverlayDispatchContext);
  const { apiName, apiURL, apiDescription, apiImageURL } =
    useContext(OverlayFormContext);
  return (
    <div className='overlay'>
      <div className='overlay-content'>
        <div>
          <form>
            <div className='formGroup'>
              <button
                className='exitButton'
                onClick={() => {
                  dispatch({ type: actions.EXIT });
                }}>
                X
              </button>
              <h2>Add Tech</h2>
              <input
                type='text'
                className='input-one'
                placeholder='Add API Name'
                value={apiName}
                onChange={event => {
                  dispatch({
                    type: actions.NAME_INPUT,
                    payload: event.target.value,
                  });
                }}
              />

              <input
                type='text'
                className='input-one'
                placeholder='Add API URL'
                value={apiURL}
                onChange={event => {
                  dispatch({
                    type: actions.URL_INPUT,
                    payload: event.target.value,
                  });
                }}
              />
              <textarea
                className='input-one'
                rows='3'
                maxLength='150'
                placeholder='Add Brief Description'
                value={apiDescription}
                onChange={event => {
                  dispatch({
                    type: actions.DESCRIPTION_INPUT,
                    payload: event.target.value,
                  });
                }}
              />
              <input
                type='text'
                className='input-one'
                placeholder='Add Image URL'
                value={apiImageURL}
                onChange={event => {
                  dispatch({
                    type: actions.IMAGE_URL_INPUT,
                    payload: event.target.value,
                  });
                }}
              />
              <input type='file' className='input-one' accept='image/*' />
            </div>

            <div className='btn'>
              <button
                className='login-button'
                onClick={e => {
                  e.preventDefault();
                  dispatch({ type: actions.SUBMIT });
                }}>
                Submit!
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormOverlay;
