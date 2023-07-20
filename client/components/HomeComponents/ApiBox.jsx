import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Apicard.css';

const ApiBox = ({ item, index, comments }) => {
  return (
    <div className='box'>
      <div className='image-container'>
        <img src={item.image_url} alt='Tech' className='api-image' />
      </div>
      <div className='api-content'>
        <a href={item.link} className='tech-item-name'>
          {item.name}
        </a>
        <p>{item.description}</p>
        <div className='button-comment'>
          <button onClick={comments} id={item.tech_id}>
            Posts
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApiBox;
