import React, { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// import contexts
import { StateContext as OverlayFormContext } from '../../contexts/contexts.jsx';

// import required components
import HomeHeader from './HomeHeader.jsx';
import FormOverlay from './FormOverlay.jsx';

const MainHeader = () => {
  const { visible } = useContext(OverlayFormContext);
  return (
    <div className='main-header'>
      <div>
        <div className='content'>
          <HomeHeader />
          {visible && <FormOverlay />}
        </div>
      </div>
    </div>
  );
};

export default MainHeader;
