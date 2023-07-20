import React, { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { StateContext as OverlayFormContext } from '../../contexts/contexts.jsx';

import ApiBox from './ApiBox.jsx';

const ApisContainer = ({ comments }) => {
  const { apiData } = useContext(OverlayFormContext);
  const renderBox = [];
  for (let index = 0; index < apiData.length; index++) {
    renderBox.push(
      <ApiBox
        item={apiData[index]}
        index={index}
        comments={comments}
        key={index}
      />,
    );
  }
  return (
    <div className='one'>
      <div className='scroll-container'>
        <div className='grid-container'>{renderBox}</div>
      </div>
    </div>
  );
};

export default ApisContainer;
