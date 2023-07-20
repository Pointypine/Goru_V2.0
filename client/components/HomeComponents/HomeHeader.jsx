import React, { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { DispatchContext as OverlayDispatchContext } from '../../contexts/contexts.jsx';
import { homePageActions as actions } from '../../reducers/homePageReducers.jsx';

import SearchBar from '../SearchBar.jsx';

const HomeHeader = () => {
  const dispatch = useContext(OverlayDispatchContext);
  return (
    <div className='home-top-all-content'>
      <div className='home-top-title-button'>
        <h2>Cohort: CTRI 17</h2> {/* Hard coded org name */}
        <div>
          <img src='./logo.png'></img>
        </div>
        <div>
          <button
            className='button'
            onClick={() => {
              dispatch({ type: actions.SHOW_OVERLAY });
            }}>
            + ADD TECH
          </button>
        </div>
      </div>
      <div className='input-container'>
        <SearchBar />
      </div>
    </div>
  );
};

export default HomeHeader;
